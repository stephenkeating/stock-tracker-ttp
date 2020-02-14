import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux';

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const username = useSelector(state => state.user.username);
  
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to="/">Home</Link>
      { username  
        ? null
        : <> 
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          </>
      }
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </nav>
  );
};

export default Nav;
