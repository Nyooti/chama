import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

const CreateMeeting = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    agenda: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time || !formData.venue) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to create meeting
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create notification immediately after scheduling
      const meetingDateTime = formatDateTime(formData.date, formData.time);
      
      addNotification({
        type: 'meeting_scheduled',
        title: 'New Meeting Scheduled',
        message: `"${formData.title}" has been scheduled for ${meetingDateTime} at ${formData.venue}`,
        priority: 'high',
        actionUrl: '/meetings',
        metadata: {
          meetingTitle: formData.title,
          meetingDate: formData.date,
          meetingTime: formData.time,
          venue: formData.venue,
          scheduledBy: user?.first_name || 'Admin'
        }
      });

      // Show success message
      alert(`Meeting "${formData.title}" has been successfully scheduled! All members will be notified.`);
      
      // Reset form
      setFormData({
        title: '',
        date: '',
        time: '',
        venue: '',
        agenda: '',
        description: ''
      });

      // Navigate back to meetings list
      navigate('/meetings');
      
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Error scheduling meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Schedule Chama Smart Meeting</h1>
          <p className="text-muted mb-0">Create a new meeting and notify all members</p>
        </div>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/meetings')}
        >
          Back to Meetings
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Meeting Details</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Meeting Title *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Monthly Chama Meeting"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="venue" className="form-label">Venue *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        placeholder="e.g., Community Center Hall"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">Date *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={today}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="time" className="form-label">Time *</label>
                      <input 
                        type="time" 
                        className="form-control" 
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="agenda" className="form-label">Meeting Agenda</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="agenda"
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleInputChange}
                    placeholder="e.g., Financial Review, Loan Applications"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Additional Notes</label>
                  <textarea 
                    className="form-control" 
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Any additional information for members..."
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/meetings')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Meeting Preview</h5>
            </div>
            <div className="card-body">
              {formData.title && (
                <div className="mb-2">
                  <strong>Title:</strong><br />
                  <span className="text-muted">{formData.title}</span>
                </div>
              )}
              {formData.date && formData.time && (
                <div className="mb-2">
                  <strong>When:</strong><br />
                  <span className="text-muted">{formatDateTime(formData.date, formData.time)}</span>
                </div>
              )}
              {formData.venue && (
                <div className="mb-2">
                  <strong>Where:</strong><br />
                  <span className="text-muted">{formData.venue}</span>
                </div>
              )}
              {formData.agenda && (
                <div className="mb-2">
                  <strong>Agenda:</strong><br />
                  <span className="text-muted">{formData.agenda}</span>
                </div>
              )}
              {!formData.title && !formData.date && !formData.time && !formData.venue && (
                <p className="text-muted">Fill in the form to see meeting preview</p>
              )}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Notification Info</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <small>
                  <strong>📢 Automatic Notifications:</strong><br />
                  When you schedule this meeting, all Chama Smart members will receive an immediate notification with the meeting details.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
