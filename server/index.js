const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Chama Smart API is running',
    timestamp: new Date().toISOString()
  });
});

// Basic API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to Chama Smart API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      contributions: '/api/contributions/*',
      loans: '/api/loans/*',
      meetings: '/api/meetings/*',
      reports: '/api/reports/*',
      members: '/api/members/*'
    }
  });
});

// Auth routes placeholder
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Admin login
  if (email === 'admin@chamasmart.com' && password === 'admin123') {
    return res.json({ 
      message: 'Admin login successful',
      user: {
        id: 1,
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@chamasmart.com',
        phone_number: '+254700000000',
        role: 'admin',
        permissions: ['manage_members', 'manage_finances', 'view_reports', 'manage_meetings']
      },
      token: 'admin-jwt-token'
    });
  }
  
  // Regular member login
  res.json({ 
    message: 'Member login successful',
    user: {
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      email: email || 'member@chamasmart.com',
      phone_number: '+254700000000',
      role: 'member',
      permissions: ['view_contributions', 'apply_loans', 'view_meetings']
    },
    token: 'member-jwt-token'
  });
});

app.post('/api/auth/register', (req, res) => {
  // Placeholder register endpoint
  res.json({ 
    message: 'Registration endpoint - under development',
    user: {
      id: 1,
      first_name: req.body.first_name || 'New',
      last_name: req.body.last_name || 'User',
      email: req.body.email || 'user@example.com',
      phone_number: req.body.phone_number || '+254700000000'
    },
    token: 'placeholder-jwt-token'
  });
});

// Update current user's profile
app.put('/api/users/me', (req, res) => {
  // In a real app, you would verify the JWT from Authorization header and fetch the user from DB
  // For this demo, we will assume a logged-in member user and update provided fields
  const { first_name, last_name, email, phone_number, photo } = req.body || {};

  const updatedUser = {
    id: 2, // demo member id
    first_name: first_name || 'John',
    last_name: last_name || 'Doe',
    email: email || 'member@chamasmart.com',
    phone_number: phone_number || '+254700000000',
    photo: photo || '',
    role: 'member',
    permissions: ['view_contributions', 'apply_loans', 'view_meetings']
  };

  return res.json({
    message: 'Profile updated successfully',
    user: updatedUser
  });
});

// Placeholder routes for other endpoints
app.get('/api/members', (req, res) => {
  res.json({ 
    message: 'Chama Smart members endpoint', 
    data: [
      { id: 1, name: 'John Doe', role: 'Chairman' },
      { id: 2, name: 'Jane Smith', role: 'Secretary' },
      { id: 3, name: 'Mike Johnson', role: 'Treasurer' }
    ]
  });
});

app.get('/api/contributions', (req, res) => {
  res.json({ 
    message: 'Chama Smart contributions endpoint', 
    data: [],
    totalContributions: 'KSh 0',
    monthlyTarget: 'KSh 5000'
  });
});

app.get('/api/loans', (req, res) => {
  res.json({ 
    message: 'Chama Smart loans endpoint', 
    data: [],
    availableFunds: 'KSh 50000',
    interestRate: '10% per annum'
  });
});

app.get('/api/meetings', (req, res) => {
  res.json({ 
    message: 'Chama Smart meetings endpoint', 
    data: [],
    nextMeeting: 'TBD',
    meetingFrequency: 'Monthly'
  });
});

app.get('/api/reports', (req, res) => {
  res.json({ 
    message: 'Chama Smart reports endpoint', 
    data: {
      totalMembers: 25,
      totalContributions: 'KSh 125000',
      totalLoans: 'KSh 75000',
      availableFunds: 'KSh 50000'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Chama Smart API server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
