import React from 'react';
import { useParams } from 'react-router-dom';

const LoanDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Loan Details</h1>
      <p>Loan ID: {id}</p>
      <div className="card">
        <div className="card-body text-center py-5">
          <h5>Loan details will be displayed here</h5>
          <p className="text-muted">This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
