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
    price: 0,
    showQuote: false
  });

  // Get user and balance from redux
  const user = useSelector(state => state.user);
  const balance = useSelector(state => parseFloat(state.user.balance));

  const handleQuoteSubmit = e => {
    e.preventDefault();
    if (quoteForm.quantity > 0) {
      userActions.getQuote(quoteForm.ticker)
      .then(data => {
        if(!data.symbol) {
          alert("Incorrect Ticker");
          return;
        } else {
          saveQuote(data)
        };
      })
    } else {
      alert('Quantity must be 1 or more.');
    };
  };

  const handleBuyShares = e => {
    e.preventDefault();
    
    if ( e.target.quotePrice.value > balance ) {
      alert('Insufficient Funds');
    } else {
      // Save purchase to backend
      userActions.newTransactionToDB({ticker: quoteForm.ticker, quantity: quoteForm.quantity, price: quoteForm.price, user_id: user.id})
      .then (data => {
        // Update user balance, transactions, and portfolio
        // console.log(data)
        setQuoteForm({ticker: '', quantity: 0, price: 0, showQuote: false});
        dispatch(userActions.updateUserBalanceAction(data.balance));
        dispatch(userActions.addTransactionAction({
          id: data.transaction.id, 
          price: data.transaction.price, 
          quantity: data.transaction.quantity, 
          ticker: data.transaction.ticker, 
          user_id: data.transaction.user_id
        }));
        dispatch(userActions.addShareToPortfolio(data.ticker, data.ticker_shares));
      })
    }
  }

  const saveQuote = data =>
    setQuoteForm({ ...quoteForm, price: data.latestPrice, showQuote: true});

  const handleTickerChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value.toUpperCase(), showQuote: false });
  
  const handleQuantityChange = e =>
    setQuoteForm({ ...quoteForm, [e.target.name]: Math.round(e.target.value), showQuote: false });

  // Destructuring keys from local state to use in the form
  const { ticker, quantity, showQuote, price } = quoteForm;

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
              value={(price * quantity)}
            />
            <input type="submit" value='Buy Shares'/>
          </form>
        : null
      }
    </>
  );
};

export default PurchaseForm;
