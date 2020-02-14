import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';

const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Controlled form functions
  const handleChange = e =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    history.push('/');
  };

  // Destructuring keys from our local state to use in the form
  const { name, email, password } = signupForm;

  // Component code
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Page</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
      />
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
      <input type="submit" />
    </form>
  );
};

export default Signup;
