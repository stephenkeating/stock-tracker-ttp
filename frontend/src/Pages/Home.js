import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Home = () => {

  // Get user from redux
  const user = useSelector(state => state.user);

  const noUser = user.name ? (
    null
  ) : (
    <>
      <br></br>
      <h3>Please <Link className='home-link' to="/signup">sign up</Link> or <Link className='home-link' to="/login">log in</Link>.</h3>
    </>
  );

  return <div className="row">
          <div className="auth-box">
            <h1>
              Welcome to Stock Tracker TTP, 
              an app by <a className='home-link' href='https://github.com/stephenkeating'>Stephen Keating</a>
            </h1>
            { noUser }
          </div>
        </div>
};

export default Home;