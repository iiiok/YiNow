import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Layout, Menu, Card } from 'antd';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			iFrameHeight: '100%'
		};
	}

	render() {
		return (
			<iframe
				style={{ width: '100%', height: this.state.iFrameHeight, overflow: 'visible' }}
				ref="iframe"
				src="/login.html"
				width="100%"
				height={this.state.iFrameHeight}
				scrolling="no"
				frameBorder="0"
			/>
		);
	}
}
