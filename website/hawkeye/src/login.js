import { BrowserProvider } from "ethers"; // Import ethers.js v6
import React, { useEffect, useState } from "react";
import "./login.css"; // Import CSS for styling

function Login() {
  const [twitterUser, setTwitterUser] = useState(localStorage.getItem("twitterUser") || null);
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress") || null);
  const [signature, setSignature] = useState(localStorage.getItem("signature") || null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (user) {
      localStorage.setItem("twitterUser", user);
      setTwitterUser(user);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const wallet = accounts[0];

        const message = `Sign in with Twitter: ${twitterUser}`;
        const signedMessage = await signer.signMessage(message);

        localStorage.setItem("walletAddress", wallet);
        localStorage.setItem("signature", signedMessage);
        setWalletAddress(wallet);
        setSignature(signedMessage);
      } catch (error) {
        console.error("Wallet connection or signing failed:", error);
      }
    } else {
      alert("MetaMask not detected. Please install a Web3 wallet.");
    }
  };

  return (
    <div className="login-page">
      <div className="split logo-side">
        <div className="logo-container">
          <img src="../assets/icons/hawkeye_logo.png" alt="Hawkeye Logo" />
          <p className="tagline">Empowering Web3 Communication</p>
        </div>
      </div>

      <div className="split login-side">
        <div className="login-container">
          <div className="login-header">
            <h2>Welcome to Hawkeye</h2>
            <p>Choose how you'd like to continue</p>
          </div>

          {!twitterUser ? (
            <a href="http://localhost:5000/auth/twitter">
              <button className="auth-button x-login-button">
                <i className="fab fa-x-twitter"></i> Log in with X
              </button>
            </a>
          ) : (
            <p className="tagline">Logged in as @{twitterUser}</p>
          )}

          <div className="divider">
            <span>Then</span>
          </div>

          {!walletAddress ? (
            <button className="auth-button wallet-button" onClick={connectWallet}>
              <i className="fas fa-wallet"></i> Connect Wallet
            </button>
          ) : (
            <p className="tagline">Wallet Connected: {walletAddress}</p>
          )}

          <div className="login-footer">
            <p>
              By continuing, you agree to our <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
