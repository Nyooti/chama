import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

const AdminFinances = () => {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState({
    totalContributions: 450000,
    totalLoans: 180000,
    availableFunds: 270000,
    monthlyTarget: 50000,
    expenses: 25000,
    pendingLoans: 3,
    overduePayments: 2
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  // Sample data for active features
  const [pendingLoans, setPendingLoans] = useState([
    { id: 1, member: 'John Doe', amount: 25000, purpose: 'Business expansion', date: '2024-01-15', status: 'pending' },
    { id: 2, member: 'Jane Smith', amount: 15000, purpose: 'School fees', date: '2024-01-14', status: 'pending' },
    { id: 3, member: 'Peter Mwangi', amount: 30000, purpose: 'Medical emergency', date: '2024-01-13', status: 'pending' }
  ]);
  
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'contribution', member: 'Alice Wanjiku', amount: 5000, date: '2024-01-15' },
    { id: 2, type: 'loan_repayment', member: 'Bob Kimani', amount: 3000, date: '2024-01-14' },
    { id: 3, type: 'expense', description: 'Meeting refreshments', amount: -800, date: '2024-01-13' },
    { id: 4, type: 'contribution', member: 'Carol Njeri', amount: 5000, date: '2024-01-12' }
  ]);
  
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Meeting venue', amount: 2000, date: '2024-01-10', category: 'Operations' },
    { id: 2, description: 'Stationery', amount: 500, date: '2024-01-08', category: 'Office' },
    { id: 3, description: 'Bank charges', amount: 300, date: '2024-01-05', category: 'Banking' }
  ]);
  
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Operations' });
  const [newTarget, setNewTarget] = useState({ monthly: financialData.monthlyTarget, annual: '' });

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real implementation, this would fetch actual data from the API
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllTransactions = () => {
    if (window.confirm('Are you sure you want to delete all transactions? This action cannot be undone.')) {
      setRecentTransactions([]);
      alert('All transactions have been deleted.');
    }
  };

  // Handler functions for active features
  const handleLoanApproval = (loanId, action) => {
    const updatedLoans = pendingLoans.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: action }
        : loan
    );
    setPendingLoans(updatedLoans.filter(loan => loan.status === 'pending'));
    
    if (action === 'approved') {
      setFinancialData(prev => ({
        ...prev,
        availableFunds: prev.availableFunds - pendingLoans.find(l => l.id === loanId).amount,
        totalLoans: prev.totalLoans + pendingLoans.find(l => l.id === loanId).amount
      }));
    }
    
    alert(`Loan ${action} successfully!`);
    setShowLoanModal(false);
  };

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      alert('Please fill in all expense details');
      return;
    }
    
    const expense = {
      id: expenses.length + 1,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString().split('T')[0],
      category: newExpense.category
    };
    
    setExpenses([expense, ...expenses]);
    setFinancialData(prev => ({
      ...prev,
      availableFunds: prev.availableFunds - expense.amount,
      expenses: prev.expenses + expense.amount
    }));
    
    setNewExpense({ description: '', amount: '', category: 'Operations' });
    setShowExpenseModal(false);
    alert('Expense added successfully!');
  };

  const handleSetTarget = () => {
    if (!newTarget.monthly) {
      alert('Please set a monthly target');
      return;
    }
    
    setFinancialData(prev => ({
      ...prev,
      monthlyTarget: parseFloat(newTarget.monthly)
    }));
    
    setShowTargetModal(false);
    alert('Financial targets updated successfully!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount).replace('KES', 'KSh');
  };

  if (user?.role !== 'admin') {
    return (
      <div className="alert alert-danger">
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Financial Management</h1>
          <p className="text-muted mb-0">Oversee Chama Smart's financial activities and make decisions</p>
        </div>
        <div className="btn-group">
          <button className="btn btn-success" onClick={() => window.location.href = '/reports'}>
            📊 Export Report
          </button>
          <button className="btn btn-outline-primary" onClick={() => setShowExpenseModal(true)}>
            💸 Add Expense
          </button>
          <button className="btn btn-outline-warning" onClick={() => setShowTargetModal(true)}>
            🎯 Set Targets
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Financial Overview Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card border-success">
                <div className="card-body text-center">
                  <h4 className="text-success">{formatCurrency(financialData.totalContributions)}</h4>
                  <p className="text-muted mb-0">Total Contributions</p>
                  <small className="text-success">↑ 12% this month</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-info">
                <div className="card-body text-center">
                  <h4 className="text-info">{formatCurrency(financialData.totalLoans)}</h4>
                  <p className="text-muted mb-0">Loans Outstanding</p>
                  <small className="text-info">{financialData.pendingLoans} pending</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-warning">
                <div className="card-body text-center">
                  <h4 className="text-warning">{formatCurrency(financialData.availableFunds)}</h4>
                  <p className="text-muted mb-0">Available Funds</p>
                  <small className="text-warning">Ready for loans</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-primary">
                <div className="card-body text-center">
                  <h4 className="text-primary">{formatCurrency(financialData.monthlyTarget)}</h4>
                  <p className="text-muted mb-0">Monthly Target</p>
                  <small className="text-primary">90% achieved</small>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'loans' ? 'active' : ''}`}
                onClick={() => setActiveTab('loans')}
              >
                Loan Approvals ({pendingLoans.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'expenses' ? 'active' : ''}`}
                onClick={() => setActiveTab('expenses')}
              >
                Expenses
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Recent Transactions</h5>
                    <span className="badge bg-primary">{recentTransactions.length}</span>
                  </div>
                  <div className="card-body">
                    {recentTransactions.slice(0, 5).map(transaction => (
                      <div key={transaction.id} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                        <div>
                          <strong>{transaction.member || transaction.description}</strong>
                          <br />
                          <small className="text-muted">{transaction.date}</small>
                        </div>
                        <div className={`text-${transaction.amount > 0 ? 'success' : 'danger'}`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Financial Health</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Monthly Target Progress</span>
                        <span>90%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Loan-to-Deposit Ratio</span>
                        <span>40%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '40%'}}></div>
                      </div>
                    </div>
                    <div className="alert alert-success">
                      <strong>Healthy!</strong> Financial ratios are within optimal range.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Pending Loan Applications</h5>
              </div>
              <div className="card-body">
                {pendingLoans.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No pending loan applications.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Amount</th>
                          <th>Purpose</th>
                          <th>Date Applied</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingLoans.map(loan => (
                          <tr key={loan.id}>
                            <td>{loan.member}</td>
                            <td>{formatCurrency(loan.amount)}</td>
                            <td>{loan.purpose}</td>
                            <td>{loan.date}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-success"
                                  onClick={() => handleLoanApproval(loan.id, 'approved')}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => handleLoanApproval(loan.id, 'rejected')}
                                >
                                  Reject
                                </button>
                                <button 
                                  className="btn btn-info"
                                  onClick={() => {
                                    setSelectedLoan(loan);
                                    setShowLoanModal(true);
                                  }}
                                >
                                  Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Expense Management</h5>
                <button className="btn btn-primary btn-sm" onClick={() => setShowExpenseModal(true)}>
                  Add Expense
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map(expense => (
                        <tr key={expense.id}>
                          <td>{expense.description}</td>
                          <td className="text-danger">{formatCurrency(expense.amount)}</td>
                          <td><span className="badge bg-secondary">{expense.category}</span></td>
                          <td>{expense.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">All Transactions</h5>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDeleteAllTransactions}
                  disabled={recentTransactions.length === 0}
                  title={recentTransactions.length === 0 ? 'No transactions to delete' : 'Delete all transactions'}
                >
                  Delete All
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Member/Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-4">No transactions available.</td>
                        </tr>
                      ) : (
                        recentTransactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td>
                              <span className={`badge ${
                                transaction.type === 'contribution' ? 'bg-success' :
                                transaction.type === 'loan_repayment' ? 'bg-info' :
                                'bg-warning'
                              }`}>
                                {transaction.type.replace('_', ' ')}
                              </span>
                            </td>
                            <td>{transaction.member || transaction.description}</td>
                            <td className={transaction.amount > 0 ? 'text-success' : 'text-danger'}>
                              {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                            </td>
                            <td>{transaction.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Loan Details Modal */}
      {showLoanModal && selectedLoan && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Application Details</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowLoanModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Member:</strong> {selectedLoan.member}</p>
                <p><strong>Amount:</strong> {formatCurrency(selectedLoan.amount)}</p>
                <p><strong>Purpose:</strong> {selectedLoan.purpose}</p>
                <p><strong>Date Applied:</strong> {selectedLoan.date}</p>
                <p><strong>Status:</strong> <span className="badge bg-warning">{selectedLoan.status}</span></p>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleLoanApproval(selectedLoan.id, 'approved')}
                >
                  Approve Loan
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleLoanApproval(selectedLoan.id, 'rejected')}
                >
                  Reject Loan
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowLoanModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Expense</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowExpenseModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      placeholder="Enter expense description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (KSh) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    >
                      <option value="Operations">Operations</option>
                      <option value="Office">Office</option>
                      <option value="Banking">Banking</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleAddExpense}
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Targets Modal */}
      {showTargetModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Set Financial Targets</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowTargetModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Monthly Contribution Target (KSh) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newTarget.monthly}
                      onChange={(e) => setNewTarget({...newTarget, monthly: e.target.value})}
                      placeholder="50000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Annual Target (KSh)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newTarget.annual}
                      onChange={(e) => setNewTarget({...newTarget, annual: e.target.value})}
                      placeholder="600000"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowTargetModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSetTarget}
                >
                  Set Targets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFinances;
