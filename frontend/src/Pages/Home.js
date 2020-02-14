import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const name = useSelector(state => state.user.name);
  const balance = useSelector(state => state.user.balance);
  const text = name ? (
    <h1>{name} is currently logged in. Balance: ${balance}</h1>
    
  ) : (
    <h1>Nobody is logged in</h1>
  );
  return <div>{text}</div>;
};

export default Home;
