// API CONSTANTS

const BASE_URL = 'http://localhost:3000';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/auth';
const LOGIN_URL = BASE_URL + '/login';
const TRANSACTIONS_URL = BASE_URL + '/transactions';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;
// const TRANSACTIONS_URL = BASE_URL + '/transactions';

const IEX_SANDBOX_API_URL = 'https://sandbox.iexapis.com/stable/'
const IEX_SANDBOX_SECRET_TOKEN = process.env.REACT_APP_IEX_SANDBOX_SECRET_TOKEN
const GET_QUOTE_URL = ticker => IEX_SANDBOX_API_URL + 'stock/' + ticker + '/quote?token=' + IEX_SANDBOX_SECRET_TOKEN

// const IEX_TOKEN = process.env.REACT_APP_IEX_API_TOKEN

// Redux Actions

const setUserAction = userObj => {
  // console.log(userObj)
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

// Fetch

// Pattern without error Handling:
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

// Pattern with error Handling:
const newUserToDB = userObj => {
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
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

// Pattern without error Handling:
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

// Pattern with error Handling:
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
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

const getQuote = data => {
  const config = {
    method: 'GET',
  };
  // console.log(data);
  return fetch(GET_QUOTE_URL(data.ticker))
    .then(r => r.json())
    .catch(error => error)
};

const newTransactionToDB = transactionObj => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  newTransactionToDB
};