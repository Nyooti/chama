import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    duration: '',
    chama_id: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement loan application API call
      console.log('Loan application data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Loan application submitted successfully!');
      navigate('/loans');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Apply for Loan from Chama Smart</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="amount" className="form-label">Loan Amount (KSh)</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="duration" className="form-label">Duration (months)</label>
                <select
                  className="form-control"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select duration...</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="guarantor" className="form-label">Guarantor (Optional)</label>
              <input
                type="text"
                className="form-control"
                id="guarantor"
                name="guarantor"
                placeholder="Name of member who will guarantee this loan"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="purpose" className="form-label">Purpose of Loan</label>
              <textarea
                className="form-control"
                id="purpose"
                name="purpose"
                rows="4"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Describe the purpose of your loan..."
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/loans')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;
