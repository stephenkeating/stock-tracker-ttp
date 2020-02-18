import React from 'react';
import { useSelector } from 'react-redux';
import PurchaseForm from '../Components/PurchaseForm'
import Stock from '../Components/Stock'

const Home = () => {
  // Get user, balance, and portfolio from redux
  const user = useSelector(state => state.user);
  const balance = useSelector(state => parseFloat(state.user.balance).toFixed(2));
  const portfolio = useSelector(state => Object.entries(state.portfolio));
  
  // Iterating over portfolio to get total portfolio value
  let portfolioValue = portfolio.map( shareObj => {
                                      return shareObj[1]['totalValue']
                                    }).reduce((a, b) => a + b, 0)

  const leftColumn = user.name ? (
    <div className="column">
      <h1>Portfolio (${portfolioValue ? portfolioValue.toFixed(2) : 0})</h1>
      {portfolio.map((stock, i) =>
          <Stock 
            key={i} 
            ticker={stock[0]}
            quantity={stock[1].quantity}
          />)}
    </div>
  ) : (
    null
  );

  const rightColumn = user.name ? (
      <div className="column">
        <h3>Cash: ${balance}</h3>
        <PurchaseForm />
      </div>
    ) : (
      null
    );

  const noUser = user.name ? (
      null
    ) : (
      <div className="auth-box">
        <h1>Please Signup or Login.</h1>
      </div>
    );

  return <div className="row">
          { leftColumn }
          { rightColumn }
          { noUser }
        </div>
};

export default Home;
