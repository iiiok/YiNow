import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Tabs, Card, Result } from 'antd';
import { socket } from '../service/socket';
import Group from '../components/SliderShow/Group';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';

import { MoviceData } from '../service/dummyDate';
const { TabPane } = Tabs;
const options = {
	legend: {
		display: false
	},
	layout: {
		padding: {
			top: 0
		}
	}
};
const options2 = {
	legend: {
		position: 'bottom',
		align: 'start'
	}
};

export default () => {
	const [ drawerVisable, setDrawerVisable ] = useState(false);
	const [ resulteData, setResulteData ] = useState(MoviceData);
	const [ voteCount, setVoteCount ] = useState(10);
	useEffect(() => {
		socket.on('openDrawerEmit', (type) => {
			console.log('openDrawerEmit outside', type);
			setDrawerVisable(type);
		});
	}, []);
	useEffect(() => {
		socket.on('voteForEmit', (resutl) => {
			const resutlArr = Object.values(resutl);
			const voteCount_var = resutlArr.reduce((a, b) => a + b, 0);
			setVoteCount(voteCount_var);
			console.log('MoviceData.datasets[0].data', MoviceData.datasets[0].data);
			// data.datasets[0].data.push(Object.values(resutlArr));
			MoviceData.datasets[0].data = Object.values(resutlArr);
			console.log('voteForEmit -resutl ', MoviceData.datasets[0].data);
			setResulteData(MoviceData);
			console.log('vote resutl', MoviceData.datasets);
		});
	}, []);

	return (
		<Card title="Top 10 Movices Voting">
			<Group drawerVisable={drawerVisable} />
			<h2>
				Great, here is what{' '}
				<u>
					<i>{voteCount}</i>
				</u>{' '}
				people think!
			</h2>
			<Divider />
			<Row>
				{' '}
				<Col span={12}>
					<Doughnut data={resulteData} redraw height={160} options={options2} />
				</Col>
				<Col span={12}>
					<Bar data={resulteData} redraw options={options} height={180} />
				</Col>
			</Row>
		</Card>
	);
};
