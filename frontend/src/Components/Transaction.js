import React from 'react';

const Transaction = props => {

  return (
    <div className="transaction" >
      {props.ticker.toUpperCase()} –– {props.quantity} {props.pluralize(props.quantity)} –– ${props.price.toFixed(2)}
    </div>
  )
}

export default Transaction;