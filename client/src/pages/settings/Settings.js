import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    meetingReminders: true,
    paymentReminders: true,
    systemUpdates: false,
    adminAlerts: user?.role === 'admin' ? true : false
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (settingName) => {
    setSettings(prev => ({
      ...prev,
      [settingName]: !prev[settingName]
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    alert('Exporting user data... This feature will download your personal data.');
    // In a real implementation, this would generate and download user data
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted. You will receive an email confirmation.');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Settings</h1>
          <p className="text-muted mb-0">Manage your account preferences and system settings</p>
        </div>
        {user?.role === 'admin' && (
          <span className="badge bg-primary">Admin User</span>
        )}
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Appearance Settings */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Appearance</h5>
              <div className="mb-3">
                <label className="form-label">Theme</label>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    id="themeSwitch"
                  />
                  <label className="form-check-label" htmlFor="themeSwitch">
                    Dark Mode
                  </label>
                </div>
                <small className="text-muted">Switch between light and dark themes</small>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                      id="emailNotifications"
                    />
                    <label className="form-check-label" htmlFor="emailNotifications">
                      Email Notifications
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.smsNotifications}
                      onChange={() => handleSettingChange('smsNotifications')}
                      id="smsNotifications"
                    />
                    <label className="form-check-label" htmlFor="smsNotifications">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.pushNotifications}
                      onChange={() => handleSettingChange('pushNotifications')}
                      id="pushNotifications"
                    />
                    <label className="form-check-label" htmlFor="pushNotifications">
                      Push Notifications
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.meetingReminders}
                      onChange={() => handleSettingChange('meetingReminders')}
                      id="meetingReminders"
                    />
                    <label className="form-check-label" htmlFor="meetingReminders">
                      Meeting Reminders
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.paymentReminders}
                      onChange={() => handleSettingChange('paymentReminders')}
                      id="paymentReminders"
                    />
                    <label className="form-check-label" htmlFor="paymentReminders">
                      Payment Reminders
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.systemUpdates}
                      onChange={() => handleSettingChange('systemUpdates')}
                      id="systemUpdates"
                    />
                    <label className="form-check-label" htmlFor="systemUpdates">
                      System Updates
                    </label>
                  </div>
                </div>
              </div>
              {user?.role === 'admin' && (
                <div className="border-top pt-3 mt-3">
                  <h6 className="text-primary">Admin Notifications</h6>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={settings.adminAlerts}
                      onChange={() => handleSettingChange('adminAlerts')}
                      id="adminAlerts"
                    />
                    <label className="form-check-label" htmlFor="adminAlerts">
                      Admin Alerts & System Notifications
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Admin-only Settings */}
          {user?.role === 'admin' && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title text-primary">Admin Settings</h5>
                <div className="row">
                  <div className="col-md-6">
                    <h6>System Configuration</h6>
                    <button className="btn btn-outline-primary btn-sm mb-2 d-block">
                      Manage User Roles
                    </button>
                    <button className="btn btn-outline-primary btn-sm mb-2 d-block">
                      System Backup
                    </button>
                    <button className="btn btn-outline-primary btn-sm mb-2 d-block">
                      Audit Logs
                    </button>
                  </div>
                  <div className="col-md-6">
                    <h6>Chama Configuration</h6>
                    <button className="btn btn-outline-success btn-sm mb-2 d-block">
                      Contribution Settings
                    </button>
                    <button className="btn btn-outline-success btn-sm mb-2 d-block">
                      Loan Parameters
                    </button>
                    <button className="btn btn-outline-success btn-sm mb-2 d-block">
                      Meeting Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Security */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Privacy & Security</h5>
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-info" onClick={handleExportData}>
                  Export My Data
                </button>
                <button className="btn btn-outline-secondary">
                  Change Password
                </button>
                <button className="btn btn-outline-warning">
                  Two-Factor Authentication
                </button>
              </div>
              <hr />
              <div className="text-danger">
                <h6>Danger Zone</h6>
                <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
                <small className="d-block mt-1">This action cannot be undone.</small>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="d-flex gap-2">
            <button 
              className="btn btn-primary" 
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
            <button className="btn btn-secondary">
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Account Information</h6>
              <p><strong>Name:</strong> {user?.first_name} {user?.last_name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> <span className={`badge ${user?.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>{user?.role}</span></p>
              <p><strong>Member Since:</strong> January 2024</p>
            </div>
          </div>

          {user?.role === 'admin' && (
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title text-primary">Admin Quick Actions</h6>
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary btn-sm">View System Status</button>
                  <button className="btn btn-outline-success btn-sm">Generate Reports</button>
                  <button className="btn btn-outline-info btn-sm">Member Analytics</button>
                  <button className="btn btn-outline-warning btn-sm">System Maintenance</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
