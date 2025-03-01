import React from 'react';
import './ConfirmPopup.css';

function ConfirmPopup({ onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>Please Verify your Humanity</p>
                <div className="popup-buttons">
                    <button 
                        className="confirm-button"
                        onClick={onConfirm}
                    >
                        Confirm Post
                    </button>
                    <button 
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopup; 