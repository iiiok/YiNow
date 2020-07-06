import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Card, Modal, Row, Col, PageHeader } from 'antd';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
const { Panel } = Collapse;

const MyAccordion = () => {
	const [ accordionIndex, setAccordionIndex ] = useState([]);

	useEffect(() => {
		socket.on('updateAccordionIndexEmit', (key) => {
			console.log('updateAccordionIndexEmit', key.accordionIndex);
			setAccordionIndex(key.accordionIndex);
		});
	}, []);
	const onAccordionChange = (key) => {
		setAccordionIndex(key);
		if (key) {
			socket.emit('updateAccordionIndex', key);
		}
	};
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
								<Card title="Zoom">Zoom</Card>
							</Col>
							<Col span={8}>
								<Card title="Team">Team</Card>
							</Col>
						</Row>
					</div>

					<p>
						Note: What all of them have in commom are:{' '}
						<ul>
							<li>Need specific software</li>
							<li>Audience need accout and software installed</li>
							<li>Heavy Network Traffic</li>
							<li>The more the attendees, the more it cost, the poorer the service</li>
						</ul>
					</p>
				</Panel>
				<Panel header="Main issues" key="2">
					<h2> Network Nightmare </h2>
					<p>
						But it is difficult to find how on your own just reading those two lines. So we have to find on
						our own with given information and we can do that by reading source code.
					</p>
					<p>
						We are not sure what to do with those two lines but it seems that we have to understand how
						markdownPreview component for our purpose.
					</p>
					<p>
						So you might visit the page and found that there are option for <br />
						langPreifx: "hljs" and it does something inside if statements like the image below.
					</p>
					<img src="images/code3.png" />
					<p>Comparing it from the official documentation about options below</p>
				</Panel>
				<Panel header="Conclusion" key="3">
					<p>
						So we found that everything is working fine and what we have to do would be styling each “hljs”
						prefixed html elements with CSS files. Maybe we shouldn’t have to understand this details about
						highlight.js and how it works. But we always have to find how to integrate pacakges from others,
						if wedecide to include it on your own project like this case for React.
					</p>
					<img src="images/code2.png" />
				</Panel>
			</Collapse>
		</div>
	);
};
export default MyAccordion;
