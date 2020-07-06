import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Layout, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, plugins, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import OpenALink from '../components/OpenALink';
// import Voting from '../components/Voting/voting';
const { TabPane } = Tabs;

export default observer(({ userName }) => {
	const [ tabIndex, setTabIndex ] = useState('1');
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
				<Tabs tabPosition="right" onChange={(TabIndex) => selectTab(TabIndex)} activeKey={tabIndex}>
					<TabPane tab="Cover pages" key="1">
						<h2>Cover page{tabIndex}</h2>
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
					<TabPane tab="Example from Socket.IO" key="4">
						<h3>Socket.IO</h3>
						<Divider />
						<video controls style={{ width: '100%', height: 'auto' }}>
							<source src="/video/Socket_IO.mp4" type="video/mp4" />
						</video>
						<OpenALink url="https://socket.io/" title="socket.io" />
					</TabPane>
					<TabPane tab="Example from Coinbase" key="5">
						<h3>Socket.IO</h3>
						<Divider />

						<video controls style={{ width: '100%', height: 'auto' }}>
							<source src="/video/coinbase.mp4" type="video/mp4" />
						</video>

						<OpenALink url="https://pro.coinbase.com/" title="Coinbase" />
					</TabPane>
					<TabPane tab="The Conclusion" key="6">
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
