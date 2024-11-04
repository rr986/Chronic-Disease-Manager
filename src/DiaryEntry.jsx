import React from 'react';

const DiaryEntry = ({ entry, deleteDiaryEntry }) => {
  const { id, date, content } = entry;

  return (
    <div className="diary-entry">
      <p>
        <strong>Date:</strong> {date.toDate().toLocaleString()}
      </p>
      <p>
        <strong>Content:</strong> {content}
      </p>
      <div className="entry-actions">
        <button
          onClick={() => deleteDiaryEntry(id)}
          className="btn delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;
