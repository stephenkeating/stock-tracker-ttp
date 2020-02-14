import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const name = useSelector(state => state.user.name);
  const balance = useSelector(state => state.user.balance);
  const portfolio = useSelector(state => state.user.portfolio);
  
  const leftColumn = portfolio ? (
    <>
      <h1>Portfolio</h1>
      <br></br>
      <h6>Stocks</h6>
    </>
  ) : (
    null
  );
  const rightColumn = name ? (
      <h1>{name}, welcome to Stock Tracker TTP. Balance: ${balance}</h1>
    ) : (
      <h1>Please Signup or Login.</h1>
    );

  return <div className="row">
          <div className="column">{ leftColumn }</div>
          <div className="column">{ rightColumn }</div>
        </div>
};

export default Home;
