import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Layout, Menu, Card } from 'antd';

export default class IXLContent extends React.Component {
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
				// onLoad={() => {
				// 	const obj = ReactDOM.findDOMNode(this);
				// 	this.setState({
				// 		iFrameHeight: obj.contentWindow.document.body.scrollHeight + 'px'
				// 	});
				// 	console.log('iframe', obj.contentWindow.document.body.scrollHeight);
				// }}
				ref="iframe"
				src="https://www.youtube.com/embed/gLLl3VbNFXg?autoplay=1&enablejsapi=1&origin=http://wwnow.com"
				seamless
				sandbox="allow-scripts allow-same-origin allow-presentation"
				width="100%"
				height={this.state.iFrameHeight}
				scrolling="no"
				frameBorder="0"
			/>
		);
	}
}
