// Home.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Home.css";
import TweetFeed from "./components/TweetFeed";

function Home() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Access the data property directly
      setPosts(result.data || []); // Ensure we fallback to empty array
      
    } catch (err) {
      setError(err.message);
      setPosts([]); // Ensure posts is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!postContent.trim() || !user) return;
    setIsPosting(true);

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitter_handle: user,
          content: postContent.trim()
        })
      });

      if (!response.ok) throw new Error('Post failed');
      
      setPostContent("");
      await fetchPosts(); // Refresh the feed
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="sidebar-nav">
          <h1 className="logo">Hawkeye</h1>
          <nav>
            <button className="nav-button">Profile</button>
            <button className="nav-button">Humanity Protocol</button>
            <button className="nav-button">Logout</button>
          </nav>
          {user && <div className="user-info">Logged in as @{user}</div>}
        </div>
      </div>

      {/* Main Feed */}
      <div className="main-feed">
        <div className="post-container">
          <textarea
            className="post-textbox"
            placeholder="What's happening in Web3?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            maxLength={280}
          />
          <div className="post-footer">
            <button
              className="post-button"
              onClick={handlePost}
              disabled={isPosting || !postContent.trim()}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <TweetFeed posts={posts} />
        )}
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Hawkeye"
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;