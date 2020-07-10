import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Card, Row, Col, PageHeader, Modal } from 'antd';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
import { data3, options, data4, data5 } from '../../service/dummyDate';
const { Panel } = Collapse;

const MyAccordion = () => {
	const [ accordionIndex, setAccordionIndex ] = useState([]);
	const [ showModal, setShowModal ] = useState(false);
	const [ pic, setPic ] = useState('/images/lecture_laptop.jpg');
	useEffect(() => {
		socket.on('updateAccordionIndexEmit', (key) => {
			console.log('updateAccordionIndexEmit', key.accordionIndex);
			setAccordionIndex(key.accordionIndex);
		});
	}, []);
	const openModal = (n) => {
		n === 1 && setPic('/images/lecture_laptop.jpg');
		n === 2 && setPic('/images/lecture_laptop2.jpg');
		setShowModal(true);
		socket.emit('setShowModal', true);
	};
	const onAccordionChange = (key) => {
		setAccordionIndex(key);
		if (key) {
			socket.emit('updateAccordionIndex', key);
		}
	};
	const handleOk = () => {
		setShowModal(false);
		socket.emit('setShowModal', false);
	};
	useEffect(() => {
		console.log('on(setShowModal)');
		socket.on('setShowModalEmit', (value) => {
			console.log('got a setShowModal Emit');
			setShowModal(value);
		});
	}, []);
	return (
		<div className="accordion">
			<PageHeader
				className="site-page-header"
				title="Traditional Online Meeting Systems"
				subTitle="Pros and Cons"
			/>

			<Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true}>
				<Panel header="Traditional Online Meeting Systems" key="1">
					<div className="site-card-wrapper">
						<Row gutter={16}>
							<Col span={8}>
								<Card title="Webinars">
									<p>
										<strong>A webinar</strong> is an online meeting or presentation held via the
										Internet in real-time. To put it simply, it is an <strong>online event</strong>,
										which connects individuals with viewers across the world.
									</p>
									<a
										href="https://myownconference.com/blog/en/index.php/what-is-a-webinar/"
										target="wwnow"
									>
										What is a Webinar and How Does it Work?
									</a>
									<OpenALink url="https://myownconference.com/blog/en/index.php/what-is-a-webinar/" />
								</Card>
							</Col>
							<Col span={8}>
								<Card title="Zoom">
									<img src="images/zoom.png" width="180px" />
								</Card>
							</Col>
							<Col span={8}>
								<Card title="Team">
									<img src="images/team.jpg" />
								</Card>
							</Col>
						</Row>
					</div>

					<h2>What do they have in commom:</h2>
					<ul>
						<li>Need specific software</li>
						<li>Audience need accout to join</li>
						<li>Heavy Network Traffic</li>
					</ul>
				</Panel>
				<Panel header="Main Issues - network" key="2">
					<h2> Network Nightmare </h2>
					<ul>
						<li>Let's say, we have 2 people to have a online meeting</li>
						<li>
							and supposed that the "Desktop Sharing Video" will consumes 2M's network traffic for every
							second
						</li>
						<li>and 0.2M for audio + web meeting</li>
					</ul>

					<Row>
						<Col spna={12}>
							<Bar data={data3} options={options} />
						</Col>
						<Col spna={12}>
							<Bar data={data4} options={options} />
						</Col>
					</Row>
					<h3>Comparing it from the official documentation about options below</h3>
					<Row gutter={16}>
						<Col onClick={() => openModal(1)}>
							<img src="/images/lecture_laptop.jpg" width="500px" />
						</Col>
						<Col onClick={() => openModal(2)}>
							<img src="/images/lecture_laptop2.jpg" width="500px" />
						</Col>
					</Row>
					<h3>Here is the traffic</h3>
					<Bar data={data5} options={options} />
				</Panel>
				<Panel header="Other shortcommings" key="3">
					<p>
						So we found that everything is working fine and what we have to do would be styling each “hljs”
						prefixed html elements with CSS files. Maybe we shouldn’t have to understand this details about
						highlight.js and how it works. But we always have to find how to integrate pacakges from others,
						if wedecide to include it on your own project like this case for React.
					</p>
					<ul>
						<li>The more the attendees, the more it cost, the poorer the service</li>
						<li>I'll se</li>
					</ul>
				</Panel>
				<Panel header="Conclusion" key="3">
					<p>
						So we found that everything is working fine and what we have to do would be styling each “hljs”
						prefixed html elements with CSS files. Maybe we shouldn’t have to understand this details about
						highlight.js and how it works. But we always have to find how to integrate pacakges from others,
						if wedecide to include it on your own project like this case for React.
					</p>
				</Panel>
			</Collapse>
			<Modal visible={showModal} onOk={handleOk} onCancel={handleOk} width="86%">
				<p>
					<img src={pic} width="100%" />
				</p>
			</Modal>
		</div>
	);
};
export default MyAccordion;
