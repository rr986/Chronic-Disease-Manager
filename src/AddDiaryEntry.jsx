import React, { useState } from 'react';

const AddDiaryEntry = ({ addDiaryEntry }) => {
  const [content, setContent] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    try {
      await addDiaryEntry(content);
      setContent('');
    } catch (error) {
      setSubmissionError(error.message || 'An error occurred.');
    }
  };

  return (
    <div className="add-diary-entry">
      {submissionError && <p className="error">{submissionError}</p>}
      <form onSubmit={handleSubmit} className="add-entry-form">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your feelings or experiences..."
            required
            minLength={10}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="btn submit-btn">
            Add Entry
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default AddDiaryEntry;
