import React, { useState, useEffect, useContext } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp, onSnapshot } from 'firebase/firestore';
import db from './firebase/reminderModel.js';
import AddReminder from './AddReminder';
import RemindList from './RemindList';
import { AuthContext } from './context/AuthContext';
import './App.css';

function Reminder() {
  const { currentUser } = useContext(AuthContext);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Reference to the current user's 'reminders' subcollection
  const remindersCollectionRef = currentUser
    ? collection(db, 'users', currentUser.uid, 'reminders')
    : null;

  // Fetch reminders from Firestore on component mount and when currentUser changes
  useEffect(() => {
    if (!remindersCollectionRef) {
      setReminders([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(remindersCollectionRef, (snapshot) => {
      const remindersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReminders(remindersData);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching reminders:', err);
      setError('Failed to fetch reminders.');
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [remindersCollectionRef]);

  // Function to add a reminder to Firestore
  const addReminder = async (title, description, due) => {
    try {
      // Validation
      if (!title || typeof title !== 'string' || title.trim().length < 5) {
        throw new Error('Title must be at least 5 characters.');
      }
      if (!description || typeof description !== 'string' || description.trim().length < 5) {
        throw new Error('Description must be at least 5 characters.');
      }
      if (!due || typeof due !== 'string' || !due.includes('-')) {
        throw new Error('Due date is not formatted properly.');
      }

      const newReminder = { title: title.trim(), description: description.trim(), due, completed: false, createdAt: Timestamp.now() };
      await addDoc(remindersCollectionRef, newReminder);
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error; // Propagate the error for AddReminder to handle
    }
  };

  // Function to toggle completed status
  const toggleCompleted = async (reminder) => {
    try {
      const reminderDoc = doc(db, 'users', currentUser.uid, 'reminders', reminder.id);
      await updateDoc(reminderDoc, { completed: !reminder.completed });
      // State updates handled by onSnapshot
    } catch (error) {
      console.error('Error toggling completed status:', error);
      setError('Failed to update reminder.');
    }
  };

  // Function to delete a reminder
  const deleteReminder = async (id) => {
    try {
      const reminderDoc = doc(db, 'users', currentUser.uid, 'reminders', id);
      await deleteDoc(reminderDoc);
      // State updates handled by onSnapshot
    } catch (error) {
      console.error('Error deleting reminder:', error);
      setError('Failed to delete reminder.');
    }
  };

  if (loading) return <p>Loading reminders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="reminder-container">
      <h1>Reminder List</h1>

      {/* Reminder Items */}
      <div className="reminder-list">
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <RemindList
              key={reminder.id}
              {...reminder}
              handleClick={toggleCompleted}
              deleteReminder={deleteReminder} // Renamed for consistency
            />
          ))
        ) : (
          <p>No reminders found. Add a new reminder below.</p>
        )}
      </div>

      {/* Add Reminder Section */}
      <div className="footer">
        <h2>Add New Reminder</h2>
        <AddReminder add_func={addReminder} />
      </div>
    </div>
  );
}

export default Reminder;
