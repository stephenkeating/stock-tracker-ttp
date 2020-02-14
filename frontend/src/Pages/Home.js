import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const name = useSelector(state => state.user.name);
  const balance = useSelector(state => state.user.balance);
  const text = name ? (
    <h1>{name}, Welcome to Stock Track TTP. Balance: ${balance}</h1>
    
  ) : (
    <h1>Please Signup or Login</h1>
  );
  return <div>{text}</div>;
};

export default Home;
