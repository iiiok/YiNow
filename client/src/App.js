import React from 'react';
// import Chat from './components/Chat/Chat';
// import Join from './components/Join/Join';
import { Portal } from './portal/';
import Test from './components/Test/index.js';
import Login from './pages/login.js';
import ComingSoon from './pages/coming-soon.js';
import { Provider } from 'mobx-react';
import UserStore from './service/UserStore';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={UserStore}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/ComingSoon" exact component={ComingSoon} />
        <Route path="/Login" exact component={Login} />
        {/* <Route path="/chat" component={Chat} /> */}
        <Route path="/onAir" component={Portal} />
        <Route path="/test" component={Test} />
      </Router>
    </Provider>
  );
};

export default App;
