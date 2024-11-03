import { Route, Routes } from 'react-router-dom';
import Reminder from './Reminder';
import VoiceInput from './VoiceInput';
import Navigation from './Navigation';
import './App.css';
import Landing from './Landing';
import ChronicConditions from './ChronicConditions';
import Account from './acc_components/Account';
import SignIn from './acc_components/SignIn';
import SignUp from './acc_components/SignUp';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './acc_components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <header className='App-header'>
          <Navigation />
        </header>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/reminder' element={<Reminder />} />
            <Route path='/chronic_conditions' element={<ChronicConditions />} />
            <Route path='/voiceinput' element={<VoiceInput />} />
            <Route path='/account' element={<Account />} />
            {/* Add more protected routes here if needed */}
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
