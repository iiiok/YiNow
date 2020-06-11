import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import SliderParent from './components/SliderShow/';
import Test from './components/Test/index.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<Route path="/" exact component={Join} />
			<Route path="/chat" component={Chat} />
			<Route path="/slick" component={SliderParent} />
			<Route path="/test" component={Test} />
		</Router>
	);
};

export default App;
