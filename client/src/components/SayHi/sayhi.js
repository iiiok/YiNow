import React, { useState, useEffect } from 'react';
import { Button, Divider, Progress, Modal, Card, Row, Col } from 'antd';

import { socket } from '../../service/socket';

const SayHi = () => {
	const [ sayHi, setVisible ] = useState(false);
	const [ confirmLoading, justConfirm ] = useState(false);
	const [ showResult, setShowResult ] = useState(false);

	useEffect(() => {
		console.log('on(sayHiEmit');
		socket.on('sayHiEmit', () => {
			console.log('got a sayHi message');
			// setShowResult(true);
			if (!sayHi) {
				setVisible(true);
			}
		});
	}, []);
	const handleOk = () => {
		justConfirm(true);
		setTimeout(() => {
			justConfirm(false);
			setVisible(false);
			setShowResult(true);
			console.log('setShowResult(true)');
		}, 400);
	};
	const justSayHi = () => {
		console.log('justSayHi');
		socket.emit('sayHi2All');
		setVisible(true);
	};
	return (
		<div>
			<Row justify="space-around" align="middle">
				<Col span={6}>
					<Button type="primary" onClick={justSayHi}>
						Say Hi to every one
					</Button>
				</Col>
				<Col span={18}>
					{showResult ? (
						<div>
							<Divider plain>The result</Divider>
							It's not my today: <br />
							<Progress percent={10} size="small" />
							Just so so: <br />
							<Progress percent={20} size="small" />
							Felling Good: <br />
							<Progress percent={70} size="small" status="success" />
						</div>
					) : null}
				</Col>
			</Row>

			<Divider />

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
					<img src="/images/felling.png" heigh="393" width="491" alt="Loading" />
				</p>
			</Modal>
		</div>
	);
};
export default SayHi;
