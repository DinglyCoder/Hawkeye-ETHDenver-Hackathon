import React, { useEffect } from "react";
import "./Home.css"; // Import CSS for styling

function Home() {
  useEffect(() => {
    // Redirect to hawkeye.html
    window.location.href = "/hawkeye.html";
  }, []);

  // Return empty div while redirecting
  return <div></div>;
}

export default Home;
