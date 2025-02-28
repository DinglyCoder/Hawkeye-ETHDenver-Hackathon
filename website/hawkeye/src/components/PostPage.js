import React, { useState } from 'react';
import TweetFeed from './TweetFeed';
import './PostPage.css';

function PostPage() {
    const [postContent, setPostContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const maxLength = 280;

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const getRemainingChars = () => {
        return maxLength - postContent.length;
    };

    const getCounterClass = () => {
        const remaining = getRemainingChars();
        if (remaining <= 20) return 'char-counter error';
        if (remaining <= 40) return 'char-counter warning';
        return 'char-counter';
    };

    const handlePost = async () => {
        if (!postContent.trim()) {
            alert('Please enter some text before posting.');
            return;
        }

        setIsPosting(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: postContent.trim(),
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            setPostContent('');
            alert('Post created successfully!');

        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="post-page">
            <div className="post-container">
                <div className="post-box">
                    <textarea
                        className="post-textbox"
                        placeholder="What's happening?"
                        value={postContent}
                        onChange={handleContentChange}
                        maxLength={maxLength}
                    />
                    <div className="post-footer">
                        <span className={getCounterClass()}>
                            {getRemainingChars()}
                        </span>
                        <button
                            className="post-button"
                            onClick={handlePost}
                            disabled={isPosting || !postContent.trim()}
                        >
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </div>
                <TweetFeed />
            </div>
        </div>
    );
}

export default PostPage; 