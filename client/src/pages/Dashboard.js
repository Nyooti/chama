import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { notifications } = useNotifications();

  // Admin dashboard data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState(null); // from /api/reports
  const [membersCount, setMembersCount] = useState(null); // from /api/members

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!isAdmin) return;
      try {
        setLoading(true);
        setError('');
        const [reportsRes, membersRes] = await Promise.all([
          api.get('/reports'),
          api.get('/members')
        ]);
        setReport(reportsRes?.data?.data || null);
        const members = membersRes?.data?.data || [];
        setMembersCount(Array.isArray(members) ? members.length : null);
      } catch (err) {
        console.error('Error loading admin dashboard data', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [isAdmin]);

  const memberActions = [
    {
      title: 'Make Contribution',
      description: 'Contribute to Chama Smart',
      link: '/contributions/pay',
      icon: '💰',
      color: 'success'
    },
    {
      title: 'Apply for Loan',
      description: 'Request a loan from Chama Smart',
      link: '/loans/apply',
      icon: '🏦',
      color: 'info'
    },
    {
      title: 'View Reports',
      description: 'Check Chama Smart financial reports',
      link: '/reports',
      icon: '📊',
      color: 'primary'
    },
    {
      title: 'View Meetings',
      description: 'View scheduled meetings',
      link: '/meetings',
      icon: '📅',
      color: 'warning'
    }
  ];

  const adminActions = [
    {
      title: 'Manage Members',
      description: 'Add, edit, or remove members',
      link: '/admin/members',
      icon: '👥',
      color: 'primary'
    },
    {
      title: 'Manage Finances',
      description: 'Oversee contributions and loans',
      link: '/admin/finances',
      icon: '💰',
      color: 'success'
    },
    {
      title: 'Schedule Meeting',
      description: 'Schedule a Chama Smart meeting',
      link: '/meetings/create',
      icon: '📅',
      color: 'warning'
    },
    {
      title: 'View Reports',
      description: 'Check detailed financial reports',
      link: '/reports',
      icon: '📊',
      color: 'info'
    }
  ];

  const quickActions = isAdmin ? adminActions : memberActions;

  const memberStats = [
    { label: 'Your Contributions', value: 'KSh 0', color: 'success' },
    { label: 'Your Active Loans', value: '0', color: 'info' },
    { label: 'Upcoming Meetings', value: '0', color: 'warning' },
    { label: 'Member Since', value: 'Jan 2024', color: 'primary' }
  ];

  const adminStats = useMemo(() => {
    return [
      { label: 'Total Members', value: membersCount ?? '—', color: 'primary' },
      { label: 'Total Contributions', value: report?.totalContributions ?? '—', color: 'success' },
      { label: 'Total Loans', value: report?.totalLoans ?? '—', color: 'info' },
      { label: 'Available Funds', value: report?.availableFunds ?? '—', color: 'warning' }
    ];
  }, [report, membersCount]);

  const stats = isAdmin ? adminStats : memberStats;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Chama Smart {isAdmin ? 'Admin ' : ''}Dashboard</h1>
          <p className="text-muted mb-0">
            Welcome back, {user?.first_name}! {isAdmin ? "Here's your admin overview." : "Here's your Chama Smart overview."}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {isAdmin && loading && (
        <div className="alert alert-info">Loading latest Chama Smart stats…</div>
      )}
      {isAdmin && !!error && (
        <div className="alert alert-danger">{error}</div>
      )}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className={`text-${stat.color} mb-1`}>{stat.value}</h5>
                    <p className="text-muted mb-0 small">{stat.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3">Quick Actions</h4>
        </div>
        {quickActions.map((action, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-3">
            <Link to={action.link} className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className={`text-${action.color} mb-3`} style={{ fontSize: '2rem' }}>
                    {action.icon}
                  </div>
                  <h6 className="card-title">{action.title}</h6>
                  <p className="card-text text-muted small">{action.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              {isAdmin ? (
                (notifications && notifications.length > 0) ? (
                  <ul className="list-group list-group-flush">
                    {notifications.slice(0, 6).map((n) => (
                      <li key={n.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{n.title}</div>
                          <div className="small text-muted">{n.message}</div>
                        </div>
                        {!n.read && <span className="badge bg-primary rounded-pill">New</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4 text-muted">No recent admin activity yet.</div>
                )
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No recent activity to display.</p>
                  <p className="text-muted">
                    Make a contribution or participate in Chama Smart activities to see your activity here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
