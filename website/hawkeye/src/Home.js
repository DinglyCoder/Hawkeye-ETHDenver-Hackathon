import React from "react";
import { useSearchParams } from "react-router-dom";
import "./Home.css";
import TweetFeed from "./components/TweetFeed";

function Home() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const [postContent, setPostContent] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);

  // PostPage functionality integrated
  const handlePost = async () => {
    if (!postContent.trim()) return;
    setIsPosting(true);
    // Add your post submission logic here
    setTimeout(() => {
      setIsPosting(false);
      setPostContent("");
    }, 1000);
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
        <TweetFeed />
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