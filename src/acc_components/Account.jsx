import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';

function Account() {
  return (
    <div className='card'>
      <h2 style={{ fontSize: '32px' }}>Account Page</h2>
      <ChangePassword />
      <SignOutButton />
    </div>
  );
}

export default Account;
