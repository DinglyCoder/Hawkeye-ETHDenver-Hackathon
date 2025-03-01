// TweetFeed.jsx
import React from 'react';
import Tweet from './Tweet';
import './TweetFeed.css';

function TweetFeed({ posts = [] }) {
    // Sort posts by timestamp in descending order (newest first)
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
    });

    return (
        <div className="tweet-feed">
            {sortedPosts.map(post => (
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