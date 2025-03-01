import { ethers } from "ethers";
import React, { useState } from "react";
import abi from "./abi.json";
import "./ConfirmPopup.css";

const CONTRACT_ADDRESS = "0x758997AdA4c44d944E784D90B307C70dFdc99628";
const EXPLORER_URL = "https://sepolia.etherscan.io/tx/";

function ConfirmPopup({ onConfirm, onCancel, onTransactionComplete }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [credential, setCredential] = useState("");
  const [transactionLink, setTransactionLink] = useState(null);
  const [status, setStatus] = useState("");
  const [character, setCharacter] = useState("");

  const readCharacterFromContract = async (contract) => {
    try {
      setStatus("Waiting to read character... ⌛");
      await new Promise(resolve => setTimeout(resolve, 70000));
      
      const characterValue = await contract.character();
      const parsedData = JSON.parse(characterValue);
      
      // Check if isValid exists in the response
      if (!parsedData.hasOwnProperty('isValid')) {
        setStatus("❌ Invalid verification response");
        setCharacter("Missing isValid field in response");
        return false; // Return failure status
      }
  
      if (parsedData.isValid) {
        setStatus(`✅ ${parsedData.message}`);
        setCharacter(parsedData.message);
        return true; // Return success status
      } else {
        setStatus("❌ Verification Failed");
        setCharacter(parsedData.message || "No failure details provided");
        return false;
      }
    } catch (error) {
      console.error("Error reading character:", error);
      setStatus("Failed to read character ❌");
      return false;
    }
  };

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

      // Send transaction
      const tx = await contract.sendRequest(credential);
      await tx.wait();

      const txLink = `🛡️Humanity Protocol Verified TX: ${EXPLORER_URL}${tx.hash}`;
      
      // Update parent component with TX link
      onTransactionComplete(txLink);
      setTransactionLink(txLink);
      setStatus("Transaction Confirmed ✅");

      // Start character retrieval process
      const verificationSuccess = await readCharacterFromContract(contract);
    
      if (!verificationSuccess) {
        setStatus("Verification check failed - aborting post");
        setIsVerifying(false);
        return; // Exit without confirming
      }
      // Close popup and confirm post
      setTimeout(() => {
        onConfirm(txLink);
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
        {character && (
          <p className="character-info">
            Contract Character: <strong>{character}</strong>
          </p>
        )}
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