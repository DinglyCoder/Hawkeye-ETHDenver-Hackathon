import React from "react";
import "./Home.css"; // Import CSS for styling

function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/twitter"; // Redirects to backend authentication
  };

  return (
    <div className="home-container">
      <header>
        <h1>🔹 Humanity Verified Tweets</h1>
        <p>
          A decentralized identity solution ensuring that tweets are verified on-chain 
          with proof of authorship and **Proof of Humanity**.
        </p>
      </header>

      <section className="features">
        <h2>🔍 How It Works</h2>
        <ul>
          <li>✅ Authenticate securely via **Twitter OAuth**.</li>
          <li>✅ Link your **Twitter handle to your Humanity Protocol DID**.</li>
          <li>✅ Post tweets **with on-chain verification**.</li>
          <li>✅ Chainlink oracles verify and timestamp tweets for proof.</li>
        </ul>
      </section>

      <section className="cta">
        <h2>🚀 Get Started</h2>
        <p>Sign in with Twitter to begin posting verifiable tweets.</p>
        <button className="twitter-login-button" onClick={handleLogin}>
          🔹 Sign in with Twitter
        </button>
      </section>
    </div>
  );
}

export default Home;
