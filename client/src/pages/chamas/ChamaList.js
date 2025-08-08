import React from 'react';
import { Link } from 'react-router-dom';

const ChamaList = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Chamas</h1>
        <Link to="/chamas/create" className="btn btn-primary">
          Create New Chama
        </Link>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <h5>No Chamas Found</h5>
          <p className="text-muted">
            You haven't joined any chamas yet. Create a new chama or join an existing one.
          </p>
          <Link to="/chamas/create" className="btn btn-primary">
            Create Your First Chama
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChamaList;
