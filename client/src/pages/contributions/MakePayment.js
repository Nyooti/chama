import React from 'react';

const MakePayment = () => {
  return (
    <div>
      <h1>Make Payment to Chama Smart</h1>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount (KSh)</label>
              <input type="number" className="form-control" id="amount" />
            </div>
            <div className="mb-3">
              <label htmlFor="paymentType" className="form-label">Payment Type</label>
              <select className="form-control" id="paymentType">
                <option>Monthly Contribution</option>
                <option>Special Assessment</option>
                <option>Loan Repayment</option>
                <option>Emergency Fund</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Make Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
