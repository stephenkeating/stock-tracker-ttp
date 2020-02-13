import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Nav from './Components/Nav';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes />
    </Router>
  );
};

export default App;