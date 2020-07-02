import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, Layout, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, plugins, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
const { TabPane } = Tabs;

export default observer(({ userName }) => {
	const selectVideo = (index) => {
		console.log('syncShowingTab', index);
		socket.emit('syncShowingTab', index);
	};
	const [ tabIndex, setTabIndex ] = useState(0);

	return (
		<div className="row">
			<Card title={'This is a business meeting'}>
				<Tabs tabPosition="right" onChange={(TabIndex) => selectVideo(TabIndex)}>
					<TabPane tab="Let's vote" key="3">
						<h2>Mixed data Example</h2>
						<Bar data={data3} options={options} plugins={plugins} />
					</TabPane>
					<TabPane tab="How is our business doing this year?" key="1">
						<p>Our plan</p>
						<HorizontalBar data={data2} />
					</TabPane>
					<TabPane tab="How is our business doing this year?" key="2">
						<p>Let's vote</p>
						<Doughnut data={data} />
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
