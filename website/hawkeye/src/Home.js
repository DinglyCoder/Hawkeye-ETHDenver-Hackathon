import React from "react";
import { useSearchParams } from "react-router-dom";
import "./Home.css";
import TweetFeed from "./components/TweetFeed";

function Home() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const [postContent, setPostContent] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  const maxChars = 280;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setPostContent(text);
    }
  };

  const getRemainingChars = () => {
    return maxChars - postContent.length;
  };

  const getCounterClass = () => {
    const remaining = getRemainingChars();
    if (remaining <= 20) return "char-counter error";
    if (remaining <= 40) return "char-counter warning";
    return "char-counter";
  };

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
            onChange={handleContentChange}
            maxLength={maxChars}
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