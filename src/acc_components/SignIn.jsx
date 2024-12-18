import React, {useContext} from 'react';
import SocialSignIn from './SocialSignIn';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
  const {currentUser} = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let {email, password} = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Navigate to='/home' />;
  }
  return (
    <div>
      <div className='card'>
        <h1>Log-In</h1>
        <form className='form' onSubmit={handleLogin}>
          <div className='form-group'>
            <label style={{ fontSize: '36px' }}>
              Email Address:
              <br />
              <input
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                required
                style={{ width: '300px', height: '40px', fontSize: '20px' }}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label style={{ fontSize: '36px' }}>
              Password:
              <br />
              <input
                name='password'
                type='password'
                placeholder='Password'
                autoComplete='off'
                required
                style={{ width: '300px', height: '40px', fontSize: '20px' }}
              />
            </label>
          </div>

          <button className='button' type='submit' style={{ width: '150px', height: '30px', fontSize: '16px' }}>
            Log in
          </button>

          <button className='forgotPassword' style={{ width: '150px', height: '30px', fontSize: '16px' }} onClick={passwordReset} >
            Forgot Password
          </button>
        </form>

        <br />
        <SocialSignIn />
      </div>
    </div>
  );
}

export default SignIn;
