import React, { useState } from 'react';
import Tweet from './Tweet';
import './TweetFeed.css';

function TweetFeed() {
    const [tweets, setTweets] = useState([
        {
            id: 1,
            username: "John Doe",
            handle: "johndoe",
            content: "Just deployed my first smart contract on the blockchain! The future of decentralized applications is here. #Web3 #Blockchain #Innovation",
            timestamp: "2024-02-28T15:30:00Z",
            likes: 142,
            comments: 24,
            shares: 12
        },
        {
            id: 2,
            username: "Alice Smith",
            handle: "alicesmith",
            content: "Excited to announce our new partnership with @HumanityProtocol! Together, we're building a more inclusive digital future. 🚀 #Partnership #Innovation",
            timestamp: "2024-02-28T14:45:00Z",
            likes: 89,
            comments: 18,
            shares: 7
        },
        {
            id: 3,
            username: "Tech Enthusiast",
            handle: "techenthusiast",
            content: "Just attended an amazing workshop on decentralized identity solutions. The potential for privacy-preserving verification is mind-blowing! 🔐 #Privacy #Blockchain #Identity",
            timestamp: "2024-02-28T13:15:00Z",
            likes: 203,
            comments: 31,
            shares: 15
        }
    ]);

    const handleLike = (tweetId, isLiked) => {
        // Here you would typically make an API call to update the like status
        console.log(`Tweet ${tweetId} ${isLiked ? 'liked' : 'unliked'}`);
    };

    const handleComment = (tweetId) => {
        // Here you would typically open a comment modal or navigate to comments page
        console.log(`Opening comments for tweet ${tweetId}`);
    };

    const handleShare = (tweetId) => {
        // Here you would typically open a share modal
        console.log(`Opening share options for tweet ${tweetId}`);
    };

    return (
        <div className="tweet-feed">
            {tweets.map(tweet => (
                <Tweet
                    key={tweet.id}
                    username={tweet.username}
                    handle={tweet.handle}
                    content={tweet.content}
                    timestamp={tweet.timestamp}
                    likes={tweet.likes}
                    comments={tweet.comments}
                    shares={tweet.shares}
                    onLike={(isLiked) => handleLike(tweet.id, isLiked)}
                    onComment={() => handleComment(tweet.id)}
                    onShare={() => handleShare(tweet.id)}
                />
            ))}
        </div>
    );
}

export default TweetFeed; 