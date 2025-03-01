// TweetFeed.jsx
import React from 'react';
import Tweet from './Tweet';
import './TweetFeed.css';

function TweetFeed({ posts = [] }) {  // Add default value
    return (
      <div className="tweet-feed">
        {posts.map(post => (
          <Tweet
            key={post.id}
            username={post.twitter_handle}
            handle={post.twitter_handle}
            content={post.content}
            timestamp={post.created_at}
            likes={0}
            comments={0}
            shares={0}
          />
        ))}
      </div>
    );
  }

export default TweetFeed;