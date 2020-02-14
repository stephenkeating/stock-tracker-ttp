// reducer takes two arguments, state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  user: {},
  transactions: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {...state, user: payload}
    case 'SET_TRANSACTIONS':
      return {...state, transactions: payload}
    case 'CLEAR_USER':
      return {...state, user: {}};
    default:
      return state;
  }
};