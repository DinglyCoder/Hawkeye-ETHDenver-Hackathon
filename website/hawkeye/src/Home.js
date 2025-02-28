import React from "react";
import "./Home.css"; // Import CSS for styling

function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/twitter"; // Redirects to backend authentication
  };

  return (
    <div className="home-container">
      
    </div>
  );
}

export default Home;
