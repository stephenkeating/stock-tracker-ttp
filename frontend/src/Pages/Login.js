import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const LoginPage = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));
  };

  // The following could be used for error handling:
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   userActions.loginUserToDB(loginForm)
  //   .then(data => {
  //     if(data.errors) {
  //         let errors = data.erros
  //         alert("Unable to login")
  //     } else {
  //       dispatch(userActions.setUserAction(data.user));
  //       localStorage.setItem('token', data.token);
  //       props.history.push('/');
  //     }
  //   })
  // };

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;

  // Component code
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input type="submit" />
    </form>
  );
};

export default LoginPage;
