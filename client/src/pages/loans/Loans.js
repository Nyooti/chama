import React from 'react';
import { Link } from 'react-router-dom';

const Loans = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Chama Smart Loans</h1>
        <Link to="/loans/apply" className="btn btn-primary">
          Apply for Loan
        </Link>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <h5>No Loans Found</h5>
          <p className="text-muted">
            You haven't applied for any loans from Chama Smart yet. Apply for your first loan to get started.
          </p>
          <Link to="/loans/apply" className="btn btn-primary">
            Apply for Loan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loans;
