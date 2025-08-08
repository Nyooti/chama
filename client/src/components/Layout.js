import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Show only notifications intended for this user's role.
  // If no audience is specified, it's visible to everyone.
  const visibleNotifications = (notifications || []).filter(n => {
    const audience = n?.metadata?.audience;
    if (!audience) return true;
    return audience === user?.role;
  });

  // Compute unread count for visible notifications only
  const visibleUnreadCount = visibleNotifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/contributions', label: 'Contributions', icon: '💰' },
    { path: '/loans', label: 'Loans', icon: '🏦' },
    { path: '/meetings', label: 'Meetings', icon: '📅' },
    { path: '/reports', label: 'Reports', icon: '📊' },
    { path: '/contact', label: 'Contact', icon: '📞' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className={`bg-dark text-white sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} 
           style={{ width: sidebarCollapsed ? '80px' : '250px', transition: 'width 0.3s' }}>
        <div className="p-3">
          <div className="d-flex align-items-center mb-4">
            <h4 className={`mb-0 ${sidebarCollapsed ? 'd-none' : ''}`}>Chama Smart</h4>
            <button 
              className="btn btn-sm btn-outline-light ms-auto"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          <nav className="nav flex-column">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link text-white d-flex align-items-center py-2 ${
                  location.pathname === item.path ? 'bg-primary rounded' : ''
                }`}
                style={{ textDecoration: 'none' }}
              >
                <span className="me-2">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <div className="d-flex align-items-center ms-auto">
              {/* Notifications */}
              <div className="dropdown me-3">
                <button 
                  className="btn btn-outline-secondary position-relative"
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  🔔
                  {visibleUnreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {visibleUnreadCount}
                    </span>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: '350px', maxHeight: '400px', overflowY: 'auto' }}>
                  <li>
                    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                      <h6 className="mb-0">Notifications</h6>
                      {visibleUnreadCount > 0 && (
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            // Mark only visible notifications as read to avoid mutating hidden ones
                            visibleNotifications.forEach(n => {
                              if (!n.read) markAsRead(n.id);
                            });
                          }}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </li>
                  {visibleNotifications.length === 0 ? (
                    <li><span className="dropdown-item-text text-muted">No notifications</span></li>
                  ) : (
                    visibleNotifications.slice(0, 10).map((notification) => (
                      <li key={notification.id}>
                        <div 
                          className={`dropdown-item-text px-3 py-2 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                          style={{ cursor: 'pointer', whiteSpace: 'normal' }}
                          onClick={() => {
                            if (!notification.read) {
                              markAsRead(notification.id);
                            }
                            if (notification.actionUrl) {
                              navigate(notification.actionUrl);
                            }
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-1">
                                <strong className="me-2">{notification.title}</strong>
                                {!notification.read && (
                                  <span className="badge bg-primary badge-sm">New</span>
                                )}
                                {notification.priority === 'high' && (
                                  <span className="badge bg-danger badge-sm ms-1">High</span>
                                )}
                              </div>
                              <p className="mb-1 text-muted small">{notification.message}</p>
                              <small className="text-muted">
                                {new Date(notification.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </small>
                            </div>
                            <button 
                              className="btn btn-sm btn-outline-danger ms-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              title="Delete notification"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                  {visibleNotifications.length > 10 && (
                    <li>
                      <div className="dropdown-item-text text-center text-muted py-2">
                        Showing 10 of {visibleNotifications.length} notifications
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              {/* User Menu */}
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <span className="me-2">👤</span>
                  {user?.first_name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      👤 Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      ⚙️ Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
