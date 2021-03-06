import React from 'react';
// Switch renders the appropriate page
import { Switch, Route } from 'react-router-dom';
// allows us to route to all pages within the Pages folder
import Pages from './Pages';
import Portfolio from './Pages/Portfolio'

const Routes = () => {
  return (
    // <Switch> iterates over all children <Route> & only render the first one that matches the current location
    // See: https://reacttraining.com/react-router/web/guides/basic-components
    // Routes need two props: path and component
    <Switch>
      <Route path="/signup" component={Pages.Signup} />
      <Route path="/login" component={Pages.Login} />
      <Route path="/transactions" component={Pages.Transactions} />
      <Route path="/portfolio" component={Portfolio} />
      <Route exact path="/" component={Pages.Home} />
    </Switch>
  );
};

export default Routes;