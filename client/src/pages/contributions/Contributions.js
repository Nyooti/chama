import React from 'react';
import { Link } from 'react-router-dom';

const Contributions = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Chama Smart Contributions</h1>
        </div>
        <Link to="/contributions/pay" className="btn btn-primary">
          Make Payment
        </Link>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <h5>No Contributions Found</h5>
          <p className="text-muted">
            You haven't made any contributions to Chama Smart yet. Make your first payment to get started.
          </p>
          <Link to="/contributions/pay" className="btn btn-primary">
            Make Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
