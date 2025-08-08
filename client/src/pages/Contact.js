import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminContact = {
    whatsapp: '0704300972',
    email: 'nyootitom@gmail.com',
    phone: '0704300972'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Your inquiry has been sent! The admin will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I have an inquiry about Chama Smart.');
    window.open(`https://wa.me/254${adminContact.whatsapp.substring(1)}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Chama Smart Inquiry');
    const body = encodeURIComponent('Hello,\n\nI have an inquiry about Chama Smart.\n\nBest regards,');
    window.open(`mailto:${adminContact.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:+254${adminContact.phone.substring(1)}`, '_blank');
  };

  const handleSMSClick = () => {
    const message = encodeURIComponent('Hello! I have an inquiry about Chama Smart.');
    window.open(`sms:+254${adminContact.phone.substring(1)}?body=${message}`, '_blank');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Contact Us</h1>
          <p className="text-muted mb-0">Get in touch with the Chama Smart admin for any inquiries</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Send Us a Message</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject *</label>
                  <select
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select inquiry type</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Account Issues">Account Issues</option>
                    <option value="Financial Questions">Financial Questions</option>
                    <option value="Membership">Membership</option>
                    <option value="Suggestions">Suggestions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Contact</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Need immediate assistance? Contact our admin directly:
              </p>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-success d-flex align-items-center justify-content-center"
                  onClick={handleWhatsAppClick}
                >
                  <span className="me-2">📱</span>
                  WhatsApp: {adminContact.whatsapp}
                </button>
                
                <button 
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  onClick={handleEmailClick}
                >
                  <span className="me-2">✉️</span>
                  Email: {adminContact.email}
                </button>
                
                <button 
                  className="btn btn-info d-flex align-items-center justify-content-center"
                  onClick={handlePhoneClick}
                >
                  <span className="me-2">📞</span>
                  Call: {adminContact.phone}
                </button>
                
                <button 
                  className="btn btn-outline-info d-flex align-items-center justify-content-center"
                  onClick={handleSMSClick}
                >
                  <span className="me-2">💬</span>
                  SMS: {adminContact.phone}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Office Hours</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Monday - Friday:</strong><br />
                <span className="text-muted">9:00 AM - 6:00 PM</span>
              </div>
              <div className="mb-2">
                <strong>Saturday:</strong><br />
                <span className="text-muted">10:00 AM - 4:00 PM</span>
              </div>
              <div className="mb-2">
                <strong>Sunday:</strong><br />
                <span className="text-muted">Closed</span>
              </div>
              <hr />
              <div className="alert alert-info">
                <small>
                  <strong>Note:</strong> WhatsApp and email are monitored 24/7. 
                  Phone calls are best during office hours.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Frequently Asked Questions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>How do I join Chama Smart?</h6>
                  <p className="text-muted">
                    Contact the admin via WhatsApp or email to get started with your membership application.
                  </p>
                  
                  <h6>What are the contribution requirements?</h6>
                  <p className="text-muted">
                    Monthly contributions vary based on membership type. Contact us for current rates.
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>How do I apply for a loan?</h6>
                  <p className="text-muted">
                    Log into your account and navigate to the Loans section to submit an application.
                  </p>
                  
                  <h6>When are meetings held?</h6>
                  <p className="text-muted">
                    Meeting schedules are posted in the Meetings section. Members receive notifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
