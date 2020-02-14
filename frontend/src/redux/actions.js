// API CONSTANTS

const BASE_URL = 'http://localhost:3000';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/auth';
const LOGIN_URL = BASE_URL + '/login';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;
const TRANSACTIONS_URL = BASE_URL + '/transactions';

const IEX_API_URL = 'https://sandbox.iexapis.com/stable/'
const IEX_TOKEN = process.env.REACT_APP_IEX_API_TOKEN
const IEX_SANDBOX_SECRET_TOKEN = process.env.REACT_APP_IEX_SANDBOX_SECRET_TOKEN

// Redux Actions

const setUserAction = userObj => {
  // console.log(userObj)
  return {
    type: 'SET_USER',
    payload: userObj
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
    .then(userInstance => {
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  setUserAction
};