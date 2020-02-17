import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';

const Stock = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [stock, setStock] = useState({
    ticker: props.ticker,
    quantity: props.quantity,
    latestPrice: 0,
    open: 0
  });

  // useEffect acts like componentDidMount for Hooks
  useEffect(() => {
    userActions.getQuote(ticker)
      .then(data => {
        setStock({...stock, latestPrice: data.latestPrice, open: data.open})
        dispatch(userActions.updatePortfolioValue(+parseFloat(data.latestPrice * props.quantity).toFixed(2)))
    })
  }, [props.quantity])

  // Destructuring keys from local state to use in the form
  const { ticker, latestPrice, open } = stock;

  // Getting Stock Quantity from State to force component to reload
  const stateQuantity = useSelector(state => state.portfolio[ticker].quantity);

  // Display:
    // red if current price < open price, 
    // grey if current price = open price, 
    // green if the current price > open price.
  const stockColor = () => {
    if (open > latestPrice) {
      return "red"
    } else if (open < latestPrice) {
      return "green"
    } else {
      return "grey"
    }
  }
  
  const pluralize = (quantity) => {
    return quantity === 1 ? "Share" : "Shares"
  }

  return (
    <div className="stock" >
      <div className={stockColor()}>
        {ticker} –– {stateQuantity} {pluralize(stateQuantity)} –– ${+parseFloat(latestPrice * stateQuantity).toFixed(2)}
      </div>
    </div>
  )
}

export default Stock;