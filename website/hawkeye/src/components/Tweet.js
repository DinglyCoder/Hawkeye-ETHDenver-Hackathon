import React, { useState } from 'react';
import './Tweet.css';

function Tweet({ 
    username, 
    handle, 
    content, 
    timestamp,
    avatar,
    likes = 0,
    comments = 0,
    shares = 0,
    isLiked = false,
    onLike,
    onComment,
    onShare
}) {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLikedState, setIsLikedState] = useState(isLiked);

    const handleLike = () => {
        if (onLike) {
            onLike(!isLikedState);
        }
        setIsLikedState(!isLikedState);
        setLikeCount(prev => isLikedState ? prev - 1 : prev + 1);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
    };

    return (
        <div className="tweet">
            <div className="tweet-header">
                <div className="tweet-avatar">
                    {avatar ? (
                        <img src={avatar} alt={`${username}'s avatar`} />
                    ) : (
                        <div className="default-avatar" />
                    )}
                </div>
                <div className="tweet-user-info">
                    <div className="tweet-name-time">
                        <p className="tweet-username">{username}</p>
                        <p className="tweet-handle">@{handle}</p>
                        {timestamp && (
                            <span className="tweet-time">· {formatTimestamp(timestamp)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="tweet-content">
                <p>{content}</p>
            </div>

            <div className="tweet-actions">
                <button 
                    className="tweet-action" 
                    onClick={() => onComment && onComment()}
                    title="Comment"
                >
                    <i className="far fa-comment"></i>
                    {comments > 0 && <span>{comments}</span>}
                </button>

                <button 
                    className={`tweet-action ${isLikedState ? 'liked' : ''}`}
                    onClick={handleLike}
                    title="Like"
                >
                    <i className={`${isLikedState ? 'fas' : 'far'} fa-heart`}></i>
                    {likeCount > 0 && <span>{likeCount}</span>}
                </button>

                <button 
                    className="tweet-action"
                    onClick={() => onShare && onShare()}
                    title="Share"
                >
                    <i className="far fa-share-square"></i>
                    {shares > 0 && <span>{shares}</span>}
                </button>
            </div>
        </div>
    );
}

export default Tweet; 