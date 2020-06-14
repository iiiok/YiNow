import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Breadcrumb } from 'antd';
import { Result, Button, Divider, Progress, Collapse, Modal } from 'antd';

import { socket } from '../../service/socket';

function SayHi() {
	const [ sayHi, setVisible ] = useState(false);
	const [ confirmLoading, justConfirm ] = useState(false);
	const [ showResult, setShowResult ] = useState(false);

	useEffect(() => {
		socket.off('sayHiEmit').on('sayHiEmit', () => {
			console.log('got a sayHi message');
			setVisible(true);
		});
	}, []);
	const handleOk = () => {
		justConfirm(true);
		setTimeout(() => {
			justConfirm(false);
			setVisible(false);
			setShowResult(true);
		}, 800);
	};
	const justSayHi = () => {
		console.log('justSayHi');
		socket.emit('sayHi2All');
		setVisible(true);
	};
	return (
		<div>
			<Divider />
			<center>
				<Button type="primary" onClick={justSayHi}>
					SayHi
				</Button>
			</center>

			{showResult ? (
				<div style={{ width: 170 }}>
					<Divider plain>Result</Divider>
					Bad: <br />
					<Progress percent={30} size="small" status="exception" />
					Good: <br />
					<Progress percent={70} size="small" status="success" />
				</div>
			) : null}
			<Modal
				title="How are you felling today"
				visible={sayHi}
				onOk={handleOk}
				okText="Good"
				cancelText="Bad"
				confirmLoading={confirmLoading}
				onCancel={() => setVisible(false)}
			>
				<p>
					<img src="https://resizer.boardmakeronline.com:443/thumbnails/F2575A34772CDDF72ACE3C23AF07031B.png?h=393&amp;w=491" heigh="393" width='491' alt="Loading" />
				</p>
			</Modal>
		</div>
	);
}
export default SayHi;
