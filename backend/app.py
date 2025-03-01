import os

import requests
import tweepy
from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
from requests_oauthlib import OAuth1Session
from supabase import Client, create_client

# Flask app setup
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = os.urandom(24)  # Use a secure random key for session

# Twitter API Credentials
TWITTER_API_KEY = "HcRkrRArbUVQXP9w7P923jEIz"
TWITTER_API_SECRET = "M650qsIuxX84TXeaV1SN9Jp5ddqRb11P8L84zlQ0jz0SPaTNna"
CALLBACK_URL = "http://127.0.0.1:5000/auth/twitter/callback"

SUPABASE_URL = "https://amgwtlrbfwplpoddkesb.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3d0bHJiZndwbHBvZGRrZXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTIyMzcsImV4cCI6MjA1NjI4ODIzN30._eepzBfGnd9KQhKpwGYB1kuL4PY2ajuHq8il1uIjGQc"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
oauth = tweepy.OAuth1UserHandler(TWITTER_API_KEY, TWITTER_API_SECRET, callback=CALLBACK_URL)

# Route: Start Twitter OAuth flow
@app.route('/auth/twitter')
def twitter_login():
    authurl = oauth.get_authorization_url(signin_with_twitter=True)
    print(authurl)
    return redirect(authurl)
    

# Route: Handle Twitter Callback
@app.route('/auth/twitter/callback')
def twitter_callback():
    oauth_verifier = request.args.get('oauth_verifier')
    if not oauth_verifier:
        return jsonify({"error": "No verifier returned from Twitter."}), 400

    access_token, access_token_secret = oauth.get_access_token(oauth_verifier)
    user_auth = tweepy.OAuth1UserHandler(TWITTER_API_KEY, TWITTER_API_SECRET, access_token, access_token_secret)
    api = tweepy.API(user_auth)
    twitter_handle = api.verify_credentials().screen_name

    # Store user in Supabase
    data, error = supabase.table("users").upsert([
    {
        "twitter_handle": twitter_handle,
        "access_token": access_token,
        "access_token_secret": access_token_secret
    }
    ], on_conflict=["twitter_handle"]).execute()


    # Set cookie and redirect
    session["twitter_handle"] = twitter_handle
    # Redirect user to frontend with query params
    frontend_url = f"http://localhost:3000/login?user={twitter_handle}"
    return redirect(frontend_url)

@app.route('/auth/user')
def get_user():
    twitter_handle = session.get("twitter_handle")
    if not twitter_handle:
        return jsonify({"logged_in": False}), 401
    return jsonify({"logged_in": True, "twitter_handle": twitter_handle})


def get_twitter_credentials(twitter_handle):
    """Fetches the Twitter access token and secret from the database."""
    user_data = supabase.table("users").select("access_token, access_token_secret").eq("twitter_handle", twitter_handle).execute()

    user_data = user_data.data
    print(user_data)
    

    credentials = user_data[0]  # Extract the first result
    return credentials["access_token"], credentials["access_token_secret"]

def post_to_twitter_v2_raw(twitter_handle, content):
    """Raw OAuth 1.0a implementation for Twitter v2 API"""
    access_token, access_token_secret = get_twitter_credentials(twitter_handle)
    print(twitter_handle, access_token, access_token_secret)
    if not access_token or not access_token_secret:
        print("not found")
        return None

    try:
        # Create OAuth1 session with stored credentials
        oauth = OAuth1Session(
            TWITTER_API_KEY,
            client_secret=TWITTER_API_SECRET,
            resource_owner_key=access_token,
            resource_owner_secret=access_token_secret
        )

        # Prepare and send request
        response = oauth.post(
            "https://api.twitter.com/2/tweets",
            json={"text": content},
            headers={"User-Agent": "Hawkeye/1.0"}
        )
        
        print(response)

        # Handle response
        if response.status_code == 201:
            tweet_data = response.json()
            return tweet_data.get('data', {}).get('id')
        
        print(f"Twitter API Error ({response.status_code}): {response.text}")
        return None

    except Exception as e:
        print(f"Twitter posting failed: {str(e)}")
        return None
    
# Route: Create a Post (and Post to Twitter)
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    twitter_handle = data.get("twitter_handle")  # Get from request
    content = data.get("content")

    if not twitter_handle or not content:
        return jsonify({"error": "Twitter handle and content are required"}), 400

    # Insert post into database
    new_post = {
        "twitter_handle": twitter_handle,
        "content": content
    }

    result = supabase.table("posts").insert(new_post).execute()

    # Post to Twitter
    tweet_id = post_to_twitter_v2_raw(twitter_handle, content)
    print(tweet_id)
    if tweet_id:
        return jsonify({"message": "Post created and tweeted!", "tweet_id": tweet_id, "post": new_post})
    else:
        return jsonify({"message": "Post created but failed to tweet.", "post": new_post})

# Route: Get All Posts
@app.route('/posts', methods=['GET'])
def get_all_posts():
    try:
        response = supabase.table("posts").select("id, twitter_handle, content, created_at").execute()
        
        # Return proper JSON structure
        return jsonify({
            "data": response.data,
            "error": None
        }), 200
        
    except Exception as e:
        print(f"Error fetching posts: {str(e)}")
        return jsonify({
            "data": [],
            "error": str(e)
        }), 500
    

if __name__ == '__main__':
    app.run(debug=True)
