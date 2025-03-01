import { ethers } from "ethers";
import React, { useState } from "react";
import abi from "./abi.json"; // Import your contract ABI
import "./ConfirmPopup.css";

const CONTRACT_ADDRESS = "0x8e0448d551f8edcc3e44697256f53bfa76e5f4a2"; // Replace with actual contract
const EXPLORER_URL = "https://sepolia.etherscan.io/tx/"; // Sepolia explorer

function ConfirmPopup({ onConfirm, onCancel, onTransactionComplete }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [credential, setCredential] = useState("");
  const [transactionLink, setTransactionLink] = useState(null);
  const [status, setStatus] = useState("");

  const handleTransaction = async () => {
    if (!credential.trim()) {
      alert("Please enter your verification credential.");
      return;
    }

    setIsVerifying(true);
    setStatus("Connecting to wallet...");

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask or another Web3 wallet.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      setStatus("Sending transaction...");

      // **Send transaction with the verification credential**
      const tx = await contract.sendRequest(credential);
        await tx.wait();

        const txLink = `${EXPLORER_URL}${tx.hash}`;
        
        // Update transaction link in parent (optional)
        onTransactionComplete(txLink);
        
        setTransactionLink(txLink);
        setStatus("Transaction Confirmed ✅");

        // Auto-close popup and confirm post after delay
        setTimeout(() => {
        onConfirm(txLink); // Pass txLink to parent ONCE
        }, 1000);
    } catch (error) {
      console.error("Transaction error:", error);
      setStatus("Transaction Failed ❌");
    }

    setIsVerifying(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Verify Your Humanity</h3>
        <textarea
          placeholder="Paste Verification Credential Here"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className="input-box"
        />
        <div className="popup-buttons">
          <button className="confirm-button" onClick={handleTransaction} disabled={isVerifying}>
            {isVerifying ? "Processing..." : "Submit"}
          </button>
          <button className="cancel-button" onClick={onCancel} disabled={isVerifying}>
            Cancel
          </button>
        </div>
        {status && <p className="status-message">{status}</p>}
        {transactionLink && (
          <p className="tx-link">
            <a href={transactionLink} target="_blank" rel="noopener noreferrer">
              View Transaction on Etherscan
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default ConfirmPopup;
