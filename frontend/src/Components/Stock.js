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

//   componentDidMount = () => {
//     fetch(`https://cloud.iexapis.com/stable/stock/${this.props.ticker}/quote?token=${IEX_SANDBOX_SECRET_TOKEN}`)
//       .then((res) => { return res.json() })
//       .then((data) => { return this.setState(

//           {current_price: data.latestPrice,
//           open_price: data.open}

//       ); }
//       )
//       .then(() => this.props.portfolioValue(this.state.current_price * this.state.qty))
//       .catch((err) => { console.log(err) })
//   }

//   componentDidUpdate = (previousProps, previousState) => {
//     if (this.props.qty !== previousProps.qty) {
//       this.props.portfolioValue(this.state.current_price * (this.props.qty - previousProps.qty))
//     }
//   }

//   stockColor = () => {
//     if (this.state.open_price > this.state.current_price) {
//       return "red"
//     } else if (this.state.open_price < this.state.current_price) {
//       return "green"
//     } else {
//       return "grey"
//     }
//   }

//   pluralize = (qty) => {
//     return qty === 1 ? "Stock" : "Stocks"
//   }

//   render(){

//     return (
//       <div className="stock">
//         <div className={this.stockColor()}>
//           {this.props.ticker.toUpperCase()} - {this.props.qty} {this.pluralize(this.props.qty)} - ${(this.props.qty * this.state.current_price).toFixed(2)}
//         </div>
//       </div>
//     )
//   }

// }

// export default Stock;