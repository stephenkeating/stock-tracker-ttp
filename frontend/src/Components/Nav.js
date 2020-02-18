import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux';
import stockLogo from '../stockLogo.png'; 

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const name = useSelector(state => state.user.name);
  
  return (
    <nav className='nav-bar'>
      <div className='logo-div'>
        <a href='https://github.com/stephenkeating'>
          <img className='logo-img' src={stockLogo} alt="Stock Tracker TTP"/>
        </a> 
      </div>
      <div className='nav-links-div'>
        <Link className='nav-link' to="/">HOME</Link>
        { name  
          ? <> 
              <Link className='nav-link' to="/transactions">TRANSACTIONS</Link>
              {/* <Link to="/portfolio">Portfolio</Link> */}
            </>
          : <> 
              <Link className='nav-link' to="/signup">SIGNUP</Link>
              <Link className='nav-link' to="/login">LOGIN</Link>
            </>
        }
        <Link className='nav-link' to="/" onClick={handleLogout}>
          LOGOUT
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
