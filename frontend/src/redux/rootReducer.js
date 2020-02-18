// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  user: {},
  transactions: [],
  portfolio: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {...state, user: payload};
    case 'SET_TRANSACTIONS':
      return {...state, transactions: payload};
    case 'SET_PORTFOLIO':
      return {...state, portfolio: payload};
    case 'CLEAR_USER':
      return initialState;
    case 'UPDATE_USER_BALANCE':
      return {...state, user: {...state.user, balance: payload}};
    case 'ADD_TRANSACTION':
      return {...state, transactions: [...state.transactions, {...payload}]};
    case 'ADD_SHARE_TO_PORTFOLIO':
      let updatedStock = {}
      updatedStock[payload.ticker] = {...updatedStock[payload.ticker], quantity: payload.quantity}
      return {...state,
              portfolio: {
                ...state.portfolio,
                ...updatedStock
              }
      }
    case 'SET_SHARE_VALUE':
      if (payload.ticker) {
        let updatedShare = {}
        updatedShare[payload.ticker] = 
        {
          ...state.portfolio[payload.ticker], 
          latestPrice: payload.latestPrice, 
          open: payload.open, 
          totalValue: state.portfolio[payload.ticker]['quantity'] * payload.latestPrice 
        }
        return {...state,
                portfolio: {
                  ...state.portfolio,
                  ...updatedShare
                }
        }
      } else {
        return state;
      }
    default:
      return state;
  }
};