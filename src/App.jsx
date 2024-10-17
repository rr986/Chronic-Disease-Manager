import {Route, Routes} from 'react-router-dom';
import Reminder from './Reminder';
import VoiceInput from './VoiceInput';
import Navigation from './Navigation';
import './App.css'
import Landing from './Landing';
import ChronicConditions from './ChronicConditions';

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <Navigation />
      </header>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/reminder' element={<Reminder />} />
        <Route path='/chronic_conditions' element={<ChronicConditions />} />
        <Route path='/voiceinput' element={<VoiceInput />} />
      </Routes>
    </div>
  )
}

export default App
