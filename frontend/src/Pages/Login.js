import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const LoginPage = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // controlled form functions
  // login without error handling
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(userActions.loginUserToDB(loginForm));
  //   props.history.push('/');
  // };

  // The following could be used for error handling:
  const handleSubmit = e => {
    e.preventDefault();
    userActions.loginUserToDB(loginForm)
    .then(data => {
      if(!data.user) {
          // console.log(data.errors);
          alert(data.errors);
          return;
      } else {
        // console.log(data)
        dispatch(userActions.setUserAction(data.user));
        dispatch(userActions.setTransactionsAction(data.transactions));
        dispatch(userActions.setPortfolioAction(data.shares_map));
        localStorage.setItem('token', data.token);
        props.history.push('/portfolio');
      }
    })
  };

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { email, password } = loginForm;

  // Component code
  return (
    <div className="row">
      <div className='auth-box'>
        <form onSubmit={handleSubmit}>
          <h1>Login Page</h1>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br></br>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
