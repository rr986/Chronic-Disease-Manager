import {Route, Routes} from 'react-router-dom';
import Reminder from './Reminder';
import Navigation from './Navigation';
import './App.css'
import Landing from './Landing';

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <Navigation />
      </header>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/reminder' element={<Reminder />} />
      </Routes>
    </div>
  )
}

export default App
