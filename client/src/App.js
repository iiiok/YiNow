import React from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import { Portal } from './portal/';
import Test from './components/Test/index.js';
import Login from './pages/login.js';
import ComingSoon from './pages/coming-soon.js';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/ComingSoon" exact component={ComingSoon} />
      <Route path="/Login" exact component={Login} />
      {/* <Route path="/chat" component={Chat} /> */}
      <Route path="/onAir" component={Portal} />
      <Route path="/test" component={Test} />
    </Router>
  );
};

export default App;
