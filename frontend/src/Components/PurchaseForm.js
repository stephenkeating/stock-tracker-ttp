import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import userActions from '../redux/actions';

const PurchaseForm = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [quoteForm, setQuoteForm] = useState({
    ticker: '',
    quantity: 0,
    latestPrice: 0,
    showQuote: false
  });

  // getting user balance from redux
  const balance = useSelector(state => parseFloat(state.user.balance));

  const handleQuoteSubmit = e => {
    e.preventDefault();
    console.log(quoteForm);
    if (quoteForm.quantity > 0) {
      userActions.getQuote(quoteForm)
      .then(data => {
        if(!data.symbol) {
          console.log(data);
          alert("Incorrect Ticker");
          return;
        } else {
          console.log(data)
          saveQuote(data)
        };
      })
    } else {
      alert('Quantity must be 1 or more.');
    };
  };

  const handleBuyShares = e => {
    e.preventDefault();
    console.log(e.target.quotePrice.value, balance);
    if ( e.target.quotePrice.value > balance ) {
      alert('Insufficient Funds')
    } else {
      // console.log( ticker, quantity, quotePrice );
      console.log( quoteForm, balance );
    }
  }

  const saveQuote = data =>
    setQuoteForm({ ...quoteForm, latestPrice: data.latestPrice, showQuote: true});

  const handleTickerChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value.toUpperCase(), showQuote: false });
  
  const handleQuantityChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: Math.round(e.target.value), showQuote: false });

  // Destructuring keys from our local state to use in the form
  const { ticker, quantity, showQuote, latestPrice } = quoteForm;

  // Component code
  return (
    <>
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
      { showQuote
        ? <form onSubmit={handleBuyShares}>
            Price:
            <input
              type="number"
              name="quotePrice"
              readOnly
              value={(latestPrice * quantity)}
            />
            <input type="submit" value='Buy Shares'/>
          </form>
        : null
      }
    </>
  );
};

export default PurchaseForm;
