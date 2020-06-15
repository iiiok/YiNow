import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Progress, Modal, Card, Row, Col, PageHeader } from 'antd';

import { socket } from '../../service/socket';
const { Panel } = Collapse;

const MyAccordion = () => {
	const [ accordionIndex, setAccordionIndex ] = useState([]);
	console.log('init MyAccordion');

	useEffect(() => {
		socket.on('updateAccordionIndexEmit', (key) => {
			console.log('updateAccordionIndexEmit', key.accordionIndex);
			setAccordionIndex(key.accordionIndex);
		});
	}, []);
	const onAccordionChange = (key) => {
		setAccordionIndex(key);
		if (key) {
			socket.emit('updateAccordionIndex', key, () => {});
		}
	};
	return (
		<div className="accordion">
			<PageHeader className="site-page-header" title="JavaScript async and await" subTitle="This is a subtitle" />
			<h4 style={{ padding: '0  30px' }}>
				Asynchronous JavaScript has never been easy. For a while, we used callbacks. Then, we used promises. And
				now, we have asynchronous functions.
			</h4>
			<Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true}>
				<Panel header="Asynchronous functions" key="1">
					<p>
						It doesn’t matter what you <code>return</code>. The returned value will always be a promise.
					</p>
					<img src="images/code1.jpg" />

					<p>
						Note: You&nbsp;should know what are JavaScript Promises and how to use them before you move on.
						Otherwise, it’ll start to get confusing. Use{' '}
						<a href="/blog/js-promises/" title="Promises in JavaScript">
							this article
						</a>{' '}
						to help you get familiar with JavaScript promises.
					</p>
				</Panel>
				<Panel header="Syntax highlighting" key="3">
					<h2>react-marked-markdown supports syntax highlighting with highlight.js</h2>
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
				<Panel header="Asynchronous functions always return promises" key="2">
					<p>
						So we found that everything is working fine and what we have to do would be styling each “hljs”
						prefixed html elements with CSS files. Maybe we shouldn’t have to understand this details about
						highlight.js and how it works. But we always have to find how to integrate pacakges from others,
						if wedecide to include it on your own project like this case for React.
					</p>
					<img src="images/code2.png" />
				</Panel>
				<h4 style={{ padding: '0  30px' }}>4. Conclusion</h4>
				<p>
					(You may still need to find CSS for other component irrelevant to code snippets to complete this
					process but you can find them easily with search and I wouldn’t write about it here for that would
					be different for the purpose of each project and not necessary for this posts.)
				</p>
			</Collapse>
		</div>
	);
};
export default MyAccordion;
