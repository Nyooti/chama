import React from 'react';
import { useParams } from 'react-router-dom';

const ChamaDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Chama Details</h1>
      <p>Chama ID: {id}</p>
      <div className="card">
        <div className="card-body text-center py-5">
          <h5>Chama details will be displayed here</h5>
          <p className="text-muted">This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default ChamaDetails;
