import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Layout, Tabs, Card } from 'antd';
import { socket } from '../../service/socket';
import { data } from '../../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';

export default ({ userName }) => {
	const selectVideo = (index) => {
		console.log('syncShowingTab', index);
		socket.emit('syncShowingTab', index);
	};
	const [ tabIndex, setTabIndex ] = useState(0);

	return (
		<Row justify="space-between">
			<Col span={18}>
				<Doughnut data={data} />
			</Col>
			<Col span={6}>
				<h3>Here is the result:</h3>
				<Doughnut data={data} />
			</Col>
		</Row>
	);
};
