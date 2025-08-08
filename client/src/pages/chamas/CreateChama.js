import React from 'react';

const CreateChama = () => {
  return (
    <div>
      <h1>Create New Chama</h1>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Chama Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create Chama</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChama;
