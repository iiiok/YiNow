import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Layout, Tabs, Card, Result } from 'antd';
import { socket } from '../service/socket';
import Group from '../components/SliderShow/Group';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import Voting from '../components/Voting/voting';
import { data } from '../service/dummyDate';
const { TabPane } = Tabs;
const options = {
	legend: {
		display: false
	}
};

export default () => {
	const [ drawerVisable, setDrawerVisable ] = useState(false);
	const [ resulteData, setResulteData ] = useState(data);
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
			console.log('data.datasets[0].data', data.datasets[0].data);
			// data.datasets[0].data.push(Object.values(resutlArr));
			data.datasets[0].data = Object.values(resutlArr);
			console.log('voteForEmit -resutl ', data.datasets[0].data);
			setResulteData(data);
			console.log('vote resutl', data.datasets);
		});
	}, []);

	return (
		<div>
			<Group drawerVisable={drawerVisable} />
			<Divider />
			<h2>
				Great, here is what{' '}
				<u>
					<i>{voteCount}</i>
				</u>{' '}
				people think!
			</h2>
			<Doughnut data={resulteData} redraw />
			<Divider />
			<Bar data={resulteData} redraw options={options} />
		</div>
	);
};
