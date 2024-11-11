import React, { useState } from 'react';

const AddReminder = ({ add_func }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Local validation
    if (!title.trim() || title.trim().length < 5) {
      setError('Title must be at least 5 characters.');
      return;
    }
    if (!description.trim() || description.trim().length < 5) {
      setError('Description must be at least 5 characters.');
      return;
    }
    if (!due) {
      setError('Due date is required.');
      return;
    }

    try {
      console.log('Calling add_func with arguments:', title, description, due);
      await add_func(title, description, due);
      console.log('add_func executed successfully');
      setTitle('');
      setDescription('');
      setDue('');
      setSuccess('Reminder added successfully!');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'An error occurred while adding the reminder.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {/* Success Message */}
      {success && (
        <div id="success" className="alert alert-success">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div id="error" className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Reminder Form */}
      <form id="simple-form" onSubmit={handleSubmit} noValidate>
        {/* Title Input */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '22px' }}>
            Title:
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              style={{ fontSize: '20px', marginLeft: '10px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={5}
            />
          </label>
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '22px' }}>
            Description:
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              style={{ fontSize: '20px', marginLeft: '10px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={5}
            />
          </label>
        </div>

        {/* Due Date Input */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '22px' }}>
            Due:
            <input
              id="due"
              name="due"
              type="date"
              placeholder="Due Date"
              style={{ fontSize: '20px', marginLeft: '10px' }}
              value={due}
              onChange={(e) => setDue(e.target.value)}
              min={today}
              required
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ fontSize: '16px', padding: '5px 10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReminder;
