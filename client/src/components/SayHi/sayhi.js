import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Breadcrumb } from 'antd';
import { Result, Button, Divider, Progress, Collapse, Modal } from 'antd';
import {ENDPOINT} from '../../config/'
import io from 'socket.io-client';

let socket;
socket = io(ENDPOINT);

function SayHi() {
	const [ sayHi, setSayHi ] = useState(false);
	const [ confirmLoading, justConfirm ] = useState(false);
	const [ showResult, setShowResult ] = useState(false);

	useEffect(() => {
		socket.on('sayHi2AllEmit', () => {
			console.log('got a sayHi message');
			setSayHi(true);
		});
	}, []);
	const handleOk = () => {
		justConfirm(true);
		setTimeout(() => {
			justConfirm(false);
			setSayHi(false);
			setShowResult(true);
		}, 800);
	};
	const justSayHi = () => {
		console.log('justSayHi');
		socket.emit('sayHi2All');
		setSayHi(true);
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
	
								Bad: <br/><Progress percent={30} size="small" status="exception" />
							
								Good: <br/><Progress percent={70} size="small" status="success" />

				</div>
			) : null}
			<Modal
				title="How are you felling today"
				visible={sayHi}
				onOk={handleOk}
				okText="Good"
				cancelText="Bad"
				confirmLoading={confirmLoading}
				onCancel={() => setSayHi(false)}
			>
				<p>
					<img src="https://resizer.boardmakeronline.com:443/thumbnails/F2575A34772CDDF72ACE3C23AF07031B.png?h=393&amp;w=491" />
				</p>
			</Modal>
		</div>
	);
}
export default SayHi