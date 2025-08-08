import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="display-4 text-danger">Oops!</h1>
          <h2>Something went wrong</h2>
        </div>
        
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Details:</h4>
          <p className="mb-0">
            <code>{error?.message || 'An unexpected error occurred'}</code>
          </p>
        </div>
        
        <div className="mt-4">
          <button 
            className="btn btn-primary me-3" 
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-muted">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
