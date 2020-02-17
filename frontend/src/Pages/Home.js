import React from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PurchaseForm from '../Components/PurchaseForm'
import Stock from '../Components/Stock'

const Home = () => {
  const user = useSelector(state => state.user);
  const balance = useSelector(state => parseFloat(state.user.balance).toFixed(2));
  const portfolio = useSelector(state => Object.entries(state.portfolio));
  const portfolioValue = useSelector(state => parseFloat(state.portfolioValue).toFixed(2));

  const leftColumn = user.name ? (
    <>
      <h1>Portfolio (${portfolioValue})</h1>
      {portfolio.map((stock, i) =>
          <Stock 
            key={i} 
            ticker={stock[0]}
            quantity={stock[1].quantity}
          />)}
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
