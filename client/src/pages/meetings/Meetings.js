import React from 'react';
import { Link } from 'react-router-dom';

const Meetings = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Chama Smart Meetings</h1>
        <Link to="/meetings/create" className="btn btn-primary">
          Schedule Meeting
        </Link>
      </div>

      <div className="card">
        <div className="card-body text-center py-5">
          <h5>No Meetings Scheduled</h5>
          <p className="text-muted">
            No Chama Smart meetings have been scheduled yet. Schedule your first meeting to get started.
          </p>
          <Link to="/meetings/create" className="btn btn-primary">
            Schedule Meeting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
