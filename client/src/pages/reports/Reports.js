import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Reports = () => {
  const { user } = useAuth();

  const handleExportPDF = (reportType) => {
    // Simulate PDF export
    const filename = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    alert(`Exporting ${reportType} report as PDF: ${filename}`);
    // In a real implementation, this would generate and download a PDF
  };

  const handleExportExcel = (reportType) => {
    // Simulate Excel export
    const filename = `${reportType}_report_${new Date().toISOString().split('T')[0]}.xlsx`;
    alert(`Exporting ${reportType} report as Excel: ${filename}`);
    // In a real implementation, this would generate and download an Excel file
  };

  const handleExportCSV = (reportType) => {
    // Simulate CSV export
    const filename = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    alert(`Exporting ${reportType} report as CSV: ${filename}`);
    // In a real implementation, this would generate and download a CSV file
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Chama Smart Reports</h1>
          <p className="text-muted mb-0">Generate and export financial reports</p>
        </div>
        <div className="btn-group">
          <Link to="/reports/financial" className="btn btn-primary">
            View Financial Report
          </Link>
          {user?.role === 'admin' && (
            <div className="dropdown">
              <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Export Reports
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleExportPDF('financial')}>Export as PDF</button></li>
                <li><button className="dropdown-item" onClick={() => handleExportExcel('financial')}>Export as Excel</button></li>
                <li><button className="dropdown-item" onClick={() => handleExportCSV('financial')}>Export as CSV</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Financial Report</h5>
              <p className="card-text">View detailed financial reports for Chama Smart including contributions, loans, and expenses.</p>
              <div className="d-flex gap-2">
                <Link to="/reports/financial" className="btn btn-primary">View Report</Link>
                {user?.role === 'admin' && (
                  <div className="btn-group">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportPDF('financial')}>
                      PDF
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportExcel('financial')}>
                      Excel
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportCSV('financial')}>
                      CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Member Contributions Report</h5>
              <p className="card-text">Track individual member contribution patterns and payment history.</p>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">View Report</button>
                {user?.role === 'admin' && (
                  <div className="btn-group">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportPDF('contributions')}>
                      PDF
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportExcel('contributions')}>
                      Excel
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportCSV('contributions')}>
                      CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Loans Report</h5>
              <p className="card-text">Overview of all loans, repayments, and outstanding balances.</p>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">View Report</button>
                {user?.role === 'admin' && (
                  <div className="btn-group">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportPDF('loans')}>
                      PDF
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportExcel('loans')}>
                      Excel
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportCSV('loans')}>
                      CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Meeting Minutes Report</h5>
              <p className="card-text">Export meeting minutes and attendance records.</p>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">View Report</button>
                {user?.role === 'admin' && (
                  <div className="btn-group">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportPDF('meetings')}>
                      PDF
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportExcel('meetings')}>
                      Excel
                    </button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleExportCSV('meetings')}>
                      CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="alert alert-info mt-4">
          <h6 className="alert-heading">Admin Export Features</h6>
          <p className="mb-0">As an admin, you can export all reports in PDF, Excel, or CSV format. Click the export buttons above or use the main "Export Reports" dropdown.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
