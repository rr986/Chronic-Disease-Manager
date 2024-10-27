import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {doChangePassword} from '../firebase/FirebaseFunctions';
import '../App.css';

function ChangePassword() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  console.log(currentUser);

  const submitForm = async (event) => {
    event.preventDefault();
    const {currentPassword, newPasswordOne, newPasswordTwo} =
      event.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPwMatch('New Passwords do not match, please try again');
      return false;
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value
      );
      alert('Password has been changed, you will now be logged out');
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser.providerData[0].providerId === 'password') {
    return (
      <div>
        {pwMatch && <h4 className='error'>{pwMatch}</h4>}
        <h2 style={{ fontSize: '30px' }}>Hi {currentUser.displayName}, Change Your Password Below</h2>
        <form onSubmit={submitForm}>
          <div className='form-group'>
            <label style={{ fontSize: '24px' }}>
              Current Password:
              <input
                className='form-control'
                name='currentPassword'
                id='currentPassword'
                type='password'
                placeholder='Current Password'
                autoComplete='off'
                required
                style={{ fontSize: '24px' }}
              />
            </label>
          </div>

          <div className='form-group'>
            <label style={{ fontSize: '24px' }}>
              New Password:
              <input
                className='form-control'
                name='newPasswordOne'
                id='newPasswordOne'
                type='password'
                placeholder='Password'
                autoComplete='off'
                required
                style={{ fontSize: '24px' }}
              />
            </label>
          </div>
          <div className='form-group'>
            <label style={{ fontSize: '24px' }}>
              Confirm New Password:
              <input
                className='form-control'
                name='newPasswordTwo'
                id='newPasswordTwo'
                type='password'
                placeholder='Confirm Password'
                autoComplete='off'
                required
                style={{ fontSize: '24px' }}
              />
            </label>
          </div>

          <button className='button' type='submit' style={{ fontSize: '16px' }}>
            Change Password
          </button>
        </form>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          {currentUser.displayName}, You are signed in using a Social Media
          Provider, You cannot change your password
        </h2>
      </div>
    );
  }
}

export default ChangePassword;
