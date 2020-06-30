import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import { Portal } from './portal/';
// import SliderParent from './components/SliderShow/';
import Test from './components/Test/index.js';
import Login from './pages/login.js';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			{/* <Route path="/" exact component={Join} /> */}
			<Route path="/" exact component={Login} />
			{/* <Route path="/" exact  render={() =>  <Redirect to="/login.html"/> }/> */}
			<Route path="/chat" component={Chat} />
			<Route path="/onAir" component={Portal} />
			<Route path="/test" component={Test} />
		</Router>
	);
};

export default App;
