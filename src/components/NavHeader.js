import React from 'react';
import { logout } from '../services/users';

export default function NavHeader({ currentUser, setCurrentUser }) {
  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <div className='nav-header'>
      {currentUser && (
        <ul>
          <li>
            <p>User: {currentUser}</p>
          </li>
          <button className='logout' onClick={handleLogout}>Logout</button>
        </ul>
      )}
    </div>
  );
}
