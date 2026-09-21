import React from 'react';
import '../styles/ErrorMessage.css';

/**
 * ErrorMessage Component
 * Displays user-friendly error details and a retry button.
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Unable to Retrieve Weather</h3>
      <p className="error-description">{message}</p>
      
      {onRetry && (
        <div className="error-actions">
          <button type="button" className="btn-retry" onClick={onRetry}>
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;

