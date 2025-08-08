import React from 'react';

const PaymentHistory = () => {
  return (
    <div>
      <h1>Payment History</h1>
      <div className="card">
        <div className="card-body text-center py-5">
          <h5>No Payment History</h5>
          <p className="text-muted">Your payment history will appear here once you make contributions.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
