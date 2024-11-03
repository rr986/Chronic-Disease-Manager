import React, { useState } from 'react';

const AddChronicHealth = ({ add_func }) => {
  const [condition, setCondition] = useState('');
  const [checkup, setCheckup] = useState('');
  const [error, setError] = useState('');

  const handleChronic = async (e) => {
    e.preventDefault();
    setError(''); // Reset previous errors

    try {
      await add_func(condition, checkup); // Assume add_func returns a promise
      setCondition('');
      setCheckup('');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return (
    <div className="add-chronic-health-container">
      {/* Error Message */}
      {error && (
        <div className="alert alert-danger error-message">
          {error}
        </div>
      )}

      {/* Chronic Health Form */}
      <form className="chronic-health-form" onSubmit={handleChronic}>
        {/* Condition Input */}
        <div className="form-group">
          <label htmlFor="Condition" className="form-label">
            Condition:
          </label>
          <input
            id="Condition"
            name="Condition"
            type="text"
            placeholder="Condition"
            className="form-input"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            minLength={3}
          />
        </div>

        {/* Checkup Date Input */}
        <div className="form-group">
          <label htmlFor="Checkup" className="form-label">
            Last Checkup Date:
          </label>
          <input
            id="Checkup"
            name="Checkup"
            type="date"
            placeholder="Checkup"
            className="form-input"
            value={checkup}
            onChange={(e) => setCheckup(e.target.value)}
            required
            max={today} // Prevent future dates
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddChronicHealth;
