import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase/reminderModel';

const ConditionAdvice = () => {
  const { currentUser } = useContext(AuthContext);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConditions = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!currentUser) {
          throw new Error('User is not authenticated.');
        }

        const conditionsCollectionRef = collection(db, 'users', currentUser.uid, 'chronic_conditions');
        const snapshot = await getDocs(conditionsCollectionRef);
        const fetchedConditions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setConditions(fetchedConditions);
      } catch (err) {
        console.error('Error fetching conditions:', err);
        setError('Failed to load chronic conditions.');
      } finally {
        setLoading(false);
      }
    };

    fetchConditions();
  }, [currentUser]);

  if (loading) return <p>Loading conditions for advice...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Condition Advice</h1>
      {conditions.length > 0 ? (
        conditions.map(condition => (
          <div key={condition.id}>
            <h2>{condition.Condition}</h2>
            <p>Checkup Date: {condition.Checkup}</p>
            {/* You could add additional advice or information here */}
          </div>
        ))
      ) : (
        <p>No chronic conditions found. Please add conditions to get advice.</p>
      )}
    </div>
  );
};

export default ConditionAdvice;