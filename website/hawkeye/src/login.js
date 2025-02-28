import { BrowserProvider } from "ethers"; // Correct import for ethers v6
import React, { useEffect, useState } from "react";

function Login() {
  const [twitterUser, setTwitterUser] = useState(localStorage.getItem("twitterUser") || null);
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress") || null);
  const [signature, setSignature] = useState(localStorage.getItem("signature") || null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (user) {
      // Store in localStorage for persistence
      localStorage.setItem("twitterUser", user);

      // Update React state
      setTwitterUser(user);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // Must use 'await' in ethers v6

        // Request wallet connection
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const wallet = accounts[0];

        // Create and sign a message
        const message = `Sign in with Twitter: ${twitterUser}`;
        const signedMessage = await signer.signMessage(message);

        // Store wallet details in localStorage
        localStorage.setItem("walletAddress", wallet);
        localStorage.setItem("signature", signedMessage);

        // Update React state
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
    <div className="login-container">
      <h1>Sign in with Twitter</h1>
      {!twitterUser ? (
        <a href="http://localhost:5000/auth/twitter">
          <button className="twitter-button">Login with Twitter</button>
        </a>
      ) : (
        <>
          <p>Welcome, @{twitterUser}!</p>
          {!walletAddress ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <>
              <p>Wallet Connected: {walletAddress}</p>
              {signature && <p>Signed Message Verified ✅</p>}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Login;
