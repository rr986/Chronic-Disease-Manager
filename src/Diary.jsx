import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import db from './firebase/reminderModel.js';
import { AuthContext } from './context/AuthContext';
import AddDiaryEntry from './AddDiaryEntry';
import DiaryEntry from './DiaryEntry';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function Diary() {
  const { currentUser } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Reference to the current user's 'diary' subcollection
  const diaryCollectionRef = currentUser
    ? collection(db, 'users', currentUser.uid, 'diary')
    : null;

  useEffect(() => {
    if (!diaryCollectionRef) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      diaryCollectionRef,
      (snapshot) => {
        const diaryData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(diaryData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching diary entries:', err);
        setError('Failed to fetch diary entries.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [diaryCollectionRef]);

  // Function to add a diary entry to Firestore
  const addDiaryEntry = async (content) => {
    try {
      // Validation
      if (!content || typeof content !== 'string' || content.trim().length < 10) {
        throw new Error('Diary entry must be at least 10 characters.');
      }

      const newEntry = {
        date: Timestamp.now(),
        content: content.trim(),
      };

      await addDoc(diaryCollectionRef, newEntry);
      toast.success('Diary entry added successfully!');
    } catch (error) {
      console.error('Error adding diary entry:', error);
      setError(error.message || 'Failed to add diary entry.');
      toast.error(error.message || 'Failed to add diary entry.');
      throw error;
    }
  };

  // Function to delete a diary entry
  const deleteDiaryEntry = async (entryId) => {
    try {
      const entryDoc = doc(db, 'users', currentUser.uid, 'diary', entryId);
      await deleteDoc(entryDoc);
      toast.success('Diary entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      setError('Failed to delete diary entry.');
      toast.error('Failed to delete diary entry.');
    }
  };

  if (loading) return <p>Loading diary entries...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="diary-container">
      <h1>Your Diary</h1>

      {/* Add Diary Entry Form */}
      <AddDiaryEntry addDiaryEntry={addDiaryEntry} />

      {/* Display Diary Entries */}
      <div className="entries-list">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <DiaryEntry
              key={entry.id}
              entry={entry}
              deleteDiaryEntry={deleteDiaryEntry}
            />
          ))
        ) : (
          <p>No diary entries found. Start by adding a new entry above.</p>
        )}
      </div>
    </div>
  );
}

export default Diary;
