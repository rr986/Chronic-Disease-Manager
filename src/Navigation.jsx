import {NavLink} from 'react-router-dom';
import './App.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink
            to='/'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/reminder'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            Reminder
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
