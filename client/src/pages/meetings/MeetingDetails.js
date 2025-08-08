import React from 'react';
import { useParams } from 'react-router-dom';

const MeetingDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Meeting Details</h1>
      <p>Meeting ID: {id}</p>
      <div className="card">
        <div className="card-body text-center py-5">
          <h5>Meeting details will be displayed here</h5>
          <p className="text-muted">This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
