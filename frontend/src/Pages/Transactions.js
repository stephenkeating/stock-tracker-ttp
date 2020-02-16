import React from 'react';
import { useSelector } from 'react-redux';
import Transaction from '../Components/Transaction'

const pluralize = (quantity) => {
  return quantity === 1 ? "Share" : "Shares"
}

const Transactions = () => {
  // const name = useSelector(state => state.user.name);
  // const balance = useSelector(state => state.user.balance);
  const portfolio = useSelector(state => state.transactions);
  // console.log(portfolio);

  console.log(portfolio)

  const leftColumn = portfolio ? (
    <>
      <h2>Transactions</h2>
        {portfolio.map((transaction, i) =>
          <Transaction key={i} ticker={transaction.ticker} quantity={transaction.quantity} price={transaction.price * transaction.quantity} pluralize={pluralize}/>)}
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
