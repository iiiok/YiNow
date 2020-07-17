import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Card, Row, Col, PageHeader, Modal } from 'antd';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
import SayHi from '../../components/SayHi/sayhi';
import PopImage from '../PopImage';

const { Panel } = Collapse;

const WhyWebSocket = () => {
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
				title="How could WebSocket improve our PPT-base meeting?"
				subTitle="Pros and Cons"
			/>

			<Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true}>
				<Panel header="Much Less Network Burden" key="1">
					<div className="site-card-wrapper">
						<h2>
							Dramatic reduction in unnecessary network traffic that is obtained for the polling solution
							with 1,000, 10,000, and 100,000 concurrently connected clients and compares it to what that
							would look like with WebSocket instead.
						</h2>

						<PopImage
							picUrl="/images/dramatic_reduction.png"
							title="Dramatic reduction in unnecessary network traffic"
						/>
						<h2>
							WebSocket can provide a 500:1 or—depending on the size of the HTTP headers—even a 1000:1
							reduction in unnecessary HTTP header traffic and a 3:1 reduction in latency.
						</h2>
					</div>
				</Panel>
				<Panel header="Display in the best Clarity" key="2">
					<h2> One bigger screen? </h2>
					<img src="/images/big_screen.jpg" title="Even bigger screen?" />

					<h2>Or, Lots of small screens!</h2>
					<img src="/images/screen-time-iOS-12-02.jpg" title="Small but with best clarity" />
				</Panel>
				<Panel header="Interaction & Participation" key="3">
					<h2>Such a system could support all kinds of web-base interactions</h2>
					<ul>
						<li>Video,Audio, Image,Chart</li>
						<li>Pop-up message, Answer Sheet, Voting, Chat, Game,Message Board etc. </li>
						<li>Shopping (A direction link to shop while the product is showing on TV)</li>
					</ul>
					<Divider />
					<Card>
						<SayHi />
					</Card>
					<h2>Interaction lead to Participation </h2>
					<ul>
						<li>The tutor need to keep the audience awake and know they are not sleepping</li>
						<li>High involvement is the key outcome of most events</li>
					</ul>
				</Panel>
				<Panel header="No Need for Additional Software" key="4">
					<h2>An extra software hinders new user</h2>
					<ul>
						<li>Skype, Zoom, Team, Webinars, some time you need more than one software</li>
						<li>Almost everyone's carring a web-browser today</li>
						<li>Anonymous user means a big market</li>
					</ul>
				</Panel>
			</Collapse>
		</div>
	);
};
export default WhyWebSocket;
