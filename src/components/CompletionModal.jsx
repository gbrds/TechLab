import React from 'react';
import './CompletionModal.css';

function CompletionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="completion-modal-overlay">
      <div className="completion-modal">
        {/* Close button */}
        <button 
          className="completion-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Party popper icon */}
        <div className="completion-modal-icon">
          🎉
        </div>

        {/* Main title */}
        <h1 className="completion-modal-title">
          Server täielikult taastatud!
        </h1>

        {/* Description */}
        <p className="completion-modal-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </div>
  );
}

export default CompletionModal;
