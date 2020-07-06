import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Layout, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, plugins, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
// import Voting from '../components/Voting/voting';
const { TabPane } = Tabs;

export default observer(({ userName }) => {
	const [ tabIndex, setTabIndex ] = useState(0);
	const selectTab = (index) => {
		console.log('syncShowingTab', index);
		socket.emit('syncShowingTab', index);
		setTabIndex(index);
	};

	useEffect(() => {
		socket.on('syncShowingTabEmit', (key) => {
			console.log('syncShowingTabEmit', key);
			setTabIndex(key);
		});
	}, []);
	return (
		<div className="row">
			<Card title={'This is a business meeting'}>
				<Tabs tabPosition="right" onChange={(TabIndex) => selectTab(TabIndex)}>
					<TabPane tab="Cover pages" key="1">
						<h2>Cover page</h2>
						<img src="/images/1600w-Hy7XLKyWwv0.jpg" width="100%" />
					</TabPane>
					<TabPane tab="How is our business doing this year?" key="2">
						<p>Our plan</p>
						<HorizontalBar data={data2} />
					</TabPane>
					<TabPane tab="Predition" key="3">
						<h2>Mixed data Example</h2>
						<Bar data={data3} options={options} plugins={plugins} />
					</TabPane>
					<TabPane tab="Some Information" key="4">
						<h3>Links</h3>
						<Divider />
						<h3>Videos</h3>
						<video controls style={{ width: '100%', height: 'auto' }}>
							<source src="/video/socket_io_1.mp4" type="video/mp4" />
						</video>
					</TabPane>
					<TabPane tab="The Conclusion" key="5">
						<h2>That is all, Thanks</h2>
						<img src="/images/1600w-wl2DiGq9Lj4.jpg" width="100%" />
					</TabPane>
				</Tabs>
				<Divider />

				<Row>
					<Col lg={{ span: 3, offset: 1 }} />
				</Row>
			</Card>
		</div>
	);
});
