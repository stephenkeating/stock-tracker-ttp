import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PurchaseForm from '../Components/PurchaseForm'

const Home = () => {
  const user = useSelector(state => state.user);
  const balance = useSelector(state => parseFloat(state.user.balance).toFixed(2));
  const portfolio = useSelector(state => state.transactions);
  
  const leftColumn = portfolio ? (
    <>
      <h1>Portfolio</h1>
      <br></br>
      <h3>Stocks</h3>
    </>
  ) : (
    null
  );

  const rightColumn = user.name ? (
      <>
        <h3>Cash: ${balance}</h3>
        <PurchaseForm />
      </>
    ) : (
      <h1>Please Signup or Login.</h1>
    );

  return <div className="row">
          <div className="column">{ leftColumn }</div>
          <div className="column">{ rightColumn }</div>
        </div>
};

export default Home;
