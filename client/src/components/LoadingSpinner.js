import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const spinnerSize = size === 'sm' ? 'spinner-border-sm' : '';
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div className={`spinner-border text-primary ${spinnerSize}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <div className="mt-2 text-muted">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
