import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const PurchaseForm = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [quoteForm, setQuoteForm] = useState({
    ticker: '',
    quantity: 0
  });

  const handleQuoteSubmit = e => {
    e.preventDefault();
    userActions.getQuote(quoteForm)
    .then(data => {
      if(!data.symbol) {
        console.log(data);
        alert("Incorrect Ticker");
        return;
      } else {
        console.log(data)
    };
    // .then(data => {
    //   if(!data) {
    //       // console.log(data.errors);
    //       alert(data.errors);
    //       return;
    //   } else {
    //     console.log(data)
    //     dispatch(userActions.setUserAction(data.user));
    //     dispatch(userActions.setTransactionsAction(data.transactions));
    //     localStorage.setItem('token', data.token);
    //     props.history.push('/');
    //   }
    })
  };

  const handleTickerChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value.toUpperCase() });
  
    const handleQuantityChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { ticker, quantity } = quoteForm;

  // Component code
  return (
    <form onSubmit={handleQuoteSubmit}>
      <input
        type="text"
        name="ticker"
        value={ticker}
        onChange={handleTickerChange}
        placeholder="Ticker"
      />
      <input
        type="number"
        name="quantity"
        value={quantity}

        onChange={handleQuantityChange}
        placeholder="Quantity"
      />
      <input type="submit" value='Get Quote'/>
    </form>
  );
};

export default PurchaseForm;
