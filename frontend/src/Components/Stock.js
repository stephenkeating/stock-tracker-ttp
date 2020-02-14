import React, { Component } from 'react'

const IEX_API_URL = 'https://sandbox.iexapis.com/stable/'
const IEX_SANDBOX_SECRET_TOKEN = process.env.REACT_APP_IEX_SANDBOX_SECRET_TOKEN

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_price: 0,
      current_price: 0,
      qty: this.props.qty
    }
  }

  componentDidMount = () => {
    fetch(`https://cloud.iexapis.com/stable/stock/${this.props.ticker}/quote?token=${IEX_SANDBOX_SECRET_TOKEN}`)
      .then((res) => { return res.json() })
      .then((data) => { return this.setState(

          {current_price: data.latestPrice,
          open_price: data.open}

      ); }
      )
      .then(() => this.props.portfolioValue(this.state.current_price * this.state.qty))
      .catch((err) => { console.log(err) })
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (this.props.qty !== previousProps.qty) {
      this.props.portfolioValue(this.state.current_price * (this.props.qty - previousProps.qty))
    }
  }

  stockColor = () => {
    if (this.state.open_price > this.state.current_price) {
      return "red"
    } else if (this.state.open_price < this.state.current_price) {
      return "green"
    } else {
      return "grey"
    }
  }

  pluralize = (qty) => {
    return qty === 1 ? "Stock" : "Stocks"
  }

  render(){

    return (
      <div className="stock">
        <div className={this.stockColor()}>
          {this.props.ticker.toUpperCase()} - {this.props.qty} {this.pluralize(this.props.qty)} - ${(this.props.qty * this.state.current_price).toFixed(2)}
        </div>
      </div>
    )
  }

}

export default Stock;