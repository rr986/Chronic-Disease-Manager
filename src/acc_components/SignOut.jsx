import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';

const SignOutButton = () => {
  return (
    <button className='button' type='button' onClick={doSignOut} style={{ fontSize: '16px' }}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
