import React, { useState, useEffect, useContext } from 'react';
import AddChronicHealth from './AddChronicHealth';
import ChronCondList from './ChronicCondList';
import db from './firebase/reminderModel.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot, Timestamp, } from 'firebase/firestore';
import { AuthContext } from './context/AuthContext';

const ChronicConditions = () => {
  const { currentUser } = useContext(AuthContext);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reference to the current user's 'chronic_conditions' subcollection
  const conditionsCollectionRef = currentUser
    ? collection(db, 'users', currentUser.uid, 'chronic_conditions')
    : null;

  // Fetch conditions from Firestore on component mount and when currentUser changes
  useEffect(() => {
    if (!conditionsCollectionRef) {
      setConditions([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(conditionsCollectionRef, (snapshot) => {
      const fetchedConditions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConditions(fetchedConditions);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching conditions:', err);
      setError('Failed to fetch conditions.');
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [conditionsCollectionRef]);

  // Function to add a new condition to Firestore
  const addHealth = async (condit, check) => {
    try {
      const dueDate = new Date(check);
      const formattedDueDate = `${(dueDate.getMonth() + 1).toString().padStart(2, '0')}/${dueDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${dueDate.getFullYear()}`;

      const newCondition = {
        Condition: condit.trim(),
        Checkup: formattedDueDate,
        completed: false,
        createdAt: Timestamp.now(),
      };

      await addDoc(conditionsCollectionRef, newCondition);
      // No need to update state manually as onSnapshot handles real-time updates
    } catch (err) {
      console.error('Error adding condition:', err);
      throw new Error('Failed to add condition.');
    }
  };

  // Function to delete a condition from Firestore
  const deleteHealth = async (id) => {
    try {
      const conditionDoc = doc(db, 'users', currentUser.uid, 'chronic_conditions', id);
      await deleteDoc(conditionDoc);
      // State updates handled by onSnapshot
    } catch (err) {
      console.error('Error deleting condition:', err);
      setError('Failed to delete condition.');
    }
  };

  // Function to toggle the completed status (optional)
  const toggleCompleted = async (id) => {
    try {
      const conditionDoc = doc(db, 'users', currentUser.uid, 'chronic_conditions', id);
      const condition = conditions.find(cond => cond.id === id);
      await updateDoc(conditionDoc, { completed: !condition.completed });
      // State updates handled by onSnapshot
    } catch (err) {
      console.error('Error toggling completed status:', err);
      setError('Failed to update condition.');
    }
  };

  if (loading) return <p>Loading chronic conditions...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="chronic-conditions-container">
      <h1>Chronic Condition List</h1>

      {/* Conditions List */}
      <div className="conditions-list">
        {conditions.length > 0 ? (
          conditions.map(condition => (
            <ChronCondList
              key={condition.id}
              id={condition.id}
              Condition={condition.Condition}
              Checkup={condition.Checkup}
              completed={condition.completed}
              toggleCompleted={toggleCompleted}
              deleteReminder={deleteHealth}
            />
          ))
        ) : (
          <p>No chronic conditions recorded. Add a new condition below.</p>
        )}
      </div>

      {/* Add Chronic Health Section */}
      <div className="footer">
        <h2>Add New Chronic Condition</h2>
        <AddChronicHealth add_func={addHealth} />
      </div>
    </div>
  );
};

export default ChronicConditions;
