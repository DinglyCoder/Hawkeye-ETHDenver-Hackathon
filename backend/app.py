import os

import tweepy
from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
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


# # Route: Fetch user profile
# @app.route('/auth/user')
# def get_user():
    

if __name__ == '__main__':
    app.run(debug=True)
