import React from 'react';
import { useSelector } from 'react-redux';

const Transactions = () => {
  // const name = useSelector(state => state.user.name);
  // const balance = useSelector(state => state.user.balance);
  const portfolio = useSelector(state => state.transactions);
  console.log(portfolio);

  const leftColumn = portfolio ? (
    <>
      <h1>Transactions</h1>
      <h3>Stocks</h3>
    </>
  ) : (
    <>
      <h1>Transactions</h1>
      <h3>Stocks</h3>
    </>
  );

  const rightColumn = null;

  return <div className="row">
          <div className="column">{ leftColumn }</div>
          <div className="column">{ rightColumn }</div>
        </div>
};

export default Transactions;
