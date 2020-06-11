import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Breadcrumb } from 'antd';
import { Result, Button, Divider, Progress, Collapse, Modal } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { UserOutlined, LaptopOutlined, NotificationOutlined, SmileOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

function Test({ slideIndex }) {


	const onAccordionChange = (key) => {
		console.log('onAccordionChange', key);

	};
	return (

				<Collapse onChange={onAccordionChange}   destroyInactivePanel={true}>
					<Panel header="This is panel header 1" key="1" onClick={onAccordionChange}>
						<p>{"text"}</p>
					</Panel>
					<Panel header="This is panel header 2" key="2">
						<p>{"text"}</p>
					</Panel>
					<Panel header="This is panel header 3" key="3">
						<p>{"text"}</p>
					</Panel>
				</Collapse>
	);
}


export default Test;
