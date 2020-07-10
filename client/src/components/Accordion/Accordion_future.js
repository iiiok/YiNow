import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Card, Row, Col, PageHeader, Modal } from 'antd';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
import { data3, options, data4, data5 } from '../../service/dummyDate';
import HighLight from '../../components/TextView/HighLight';
const { Panel } = Collapse;

const PPTFuture = () => {
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
	const changeBackground = () => {
		socket.emit('changeBackground');
	};
	return (
		<div className="accordion">
			<PageHeader
				className="site-page-header"
				title="Traditional Online Meeting Systems"
				subTitle="Pros and Cons"
			/>

			<Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true}>
				<Panel header="Support most Web-base Media, Resource and widget" key="1">
					Video, Audio, image, Web Link, Chart, Voting, Bidding,Game,... Two-ways interaction, (Mostly one way
					[Client]) As a Remote Control (Public LED, Vending Machine) (Mostly one way [Host]) Real Time
					Web-Broadcast ,as a Information Synchronous System, able to support 1M (Televisions, Concerts,
					Movice theater,Sport Events, Press Conference, On-site Promotion, Seminar)
					<div className="site-card-wrapper">
						<Button onClick={changeBackground}>Change Background</Button>
					</div>
					<p>Note: What all of them have in commom are:</p>
					<ul>
						<li>Need specific software</li>
						<li>Audience need accout and software installed</li>
						<li>Heavy Network Traffic</li>
						<li>The more the attendees, the more it cost, the poorer the service</li>
					</ul>
				</Panel>
				<Panel header="It's a Before, During and After the 'Meeting' Seminar" key="2">
					<h2> Network Nightmare </h2>
					<p>
						Let's say, we have 2 people to have a online meeting, and supposed that the "Desktop Sharing
						Video" comsumes 2M's network traffic and 0.2M for audio + web meeting
					</p>
					<Bar data={data3} options={options} />
					<p>
						What about 100 attendees? <br />
						langPreifx: "hljs" and it does something inside if statements like the image below.
					</p>
					<Bar data={data4} options={options} />
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
				<Panel header="More Than Just a Meeting-assistant System" key="3">
					<h3>
						With this full-duplex communication protocol, we can do a a lot more than just a
						meeting-sidekick system
					</h3>
					<h4>
						It's a web-base, that means @Every one is ready to participate, no addictional App, not even
						need to register
					</h4>
					<ul>
						<li>
							<HighLight scriptId={18} header={'Two-ways interaction '} />{' '}
						</li>
						<li>
							<HighLight scriptId={17} header={'Mostly one way - [Client dominate] '} />{' '}
						</li>
						<li>
							<HighLight scriptId={16} header={'Mostly one way - [Host dominate] '} />
						</li>
					</ul>
					<p />
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
export default PPTFuture;
