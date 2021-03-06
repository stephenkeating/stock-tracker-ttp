// API CONSTANTS

// Backend Constants
const BASE_URL = 'https://keating-stock-tracker.herokuapp.com';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/auth';
const LOGIN_URL = BASE_URL + '/login';
const TRANSACTIONS_URL = BASE_URL + '/transactions';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// IEX Sandbox constants. See console: https://iexcloud.io/console/
const IEX_SANDBOX_API_URL = 'https://sandbox.iexapis.com/stable/'
const IEX_SANDBOX_SECRET_TOKEN = process.env.REACT_APP_IEX_SANDBOX_SECRET_TOKEN
const GET_QUOTE_URL = ticker => IEX_SANDBOX_API_URL + 'stock/' + ticker + '/quote?token=' + IEX_SANDBOX_SECRET_TOKEN

// Redux Actions

// refactor setUserAction, setTransactionsAction, and setPortfolioAction
const setUserAction = userObj => {
  return {
    type: 'SET_USER',
    payload: userObj
  }
};

const setTransactionsAction = transactionsObj => {
  return {
    type: 'SET_TRANSACTIONS',
    payload: transactionsObj
  }
};

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

const updateUserBalanceAction = balance => ({
  type: 'UPDATE_USER_BALANCE',
  payload: balance
});

const addTransactionAction = transaction => ({
  type: 'ADD_TRANSACTION',
  payload: transaction
});

const setPortfolioAction = portfolioObj => {
  return {
    type: 'SET_PORTFOLIO',
    payload: portfolioObj
  }
};

const addShareToPortfolio = (ticker, quantity) => {
  return {
    type: 'ADD_SHARE_TO_PORTFOLIO',
    payload: {ticker, quantity}
  }
};

const setShareValue = (ticker, latestPrice, open) => {
  return {
    type: 'SET_SHARE_VALUE',
    payload: {ticker, latestPrice, open}
  }
};

// Fetch

// Pattern for new user (without error handling):
// const newUserToDB = userObj => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userObj)
//   };
//   fetch(USERS_URL, config)
//     .then(r => r.json())
//     .then(data => {
//       dispatch(setUserAction(data.user));
//       localStorage.setItem('token', data.token);
//     });
// };

// Pattern for new user (with error handling):
const newUserToDB = userObj => {
  // console.log(userObj)
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  return fetch(USERS_URL, config)
    .then(r => r.json())
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config)
    .then(r => {
      dispatch(clearUserAction());
      localStorage.clear();
  });
};

// Pattern to login user (without error Handling):
// const loginUserToDB = userCredentials => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userCredentials)
//   };
//   fetch(LOGIN_URL, config)
//     .then(r => r.json())
//     .then(data => {
//       dispatch(setUserAction(data.user));
//       localStorage.setItem('token', data.token);
//     })
// };

// Pattern to login (with error handling):
const loginUserToDB = userCredentials => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  return fetch(LOGIN_URL, config)
    .then(r => r.json())
};

const persistUser = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(PERSIST_URL, config)
    .then(r => r.json())
    .then(data => {
      dispatch(setUserAction(data.user));
      dispatch(setTransactionsAction(data.transactions));
      dispatch(setPortfolioAction(data.shares_map));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

const getQuote = ticker => {
  return fetch(GET_QUOTE_URL(ticker))
    .then(r => r.json())
    .catch(error => error)
};

const newTransactionToDB = transactionObj => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ` + localStorage.token
    },
    body: JSON.stringify(transactionObj)
  };
  return fetch(TRANSACTIONS_URL, config)
    .then(r => r.json())
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  setUserAction,
  setTransactionsAction,
  getQuote,
  newTransactionToDB,
  updateUserBalanceAction,
  addTransactionAction,
  setPortfolioAction,
  addShareToPortfolio,
  setShareValue
};