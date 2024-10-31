import './App.css';
import './firebase/reminderModel.js'; // Import to ensure Firebase is initialized

function Landing() {
  return (
    <div> 
      <h2 style={{ fontSize: '36px', textAlign: 'center' }}>This is the starting page for the app click above to navigate or sign in</h2>
    </div>
  )
}

export default Landing;
