import React, { useState, useEffect } from 'react';
import { Switch, Button, Badge } from 'antd';
import { socket } from '../service/socket';
import { notification } from 'antd';

function MyStatus({ asHost, userName, onSwitch }) {
	const [ isOnAir, setIsOnAir ] = useState(true);
	const [ alreadySayHi, setAlreadySayHi ] = useState(false);
	const [ userCount, setUserCount ] = useState(1);

	const key = 'sayHiMsg';
	const triggerNote = (user, text) => {
		notification.open({
			key,
			message: 'Message from (' + user + ')',
			description: text
		});
	};

	useEffect(() => {
		socket.on('connect', function() {
			console.log('connect');
			setIsOnAir(true);
		});
		// socket.on("ping",function() {
		// 	console.log("send a ping");
		// 	setIsOnAir(false);
		// });
		// socket.on('pong', function() {
		// 	console.log('received pong');
		// 	setIsOnAir(true);
		// 	triggerNote();
		// });
		socket.on('connect_error', function() {
			console.log('connect_error ');
			setIsOnAir(false);
		});
		socket.on('disconnect', function() {
			console.log('disconnect ');
			setIsOnAir(false);
		});
		socket.on('sendNoticeEmit', (message) => {
			console.log('sendNoticeEmit ', message.user, message.text);
			triggerNote(message.user, message.text);
		});
		socket.on('sayHiLoginEmit', (userCount) => {
			console.log('sendNoticeEmit ', userCount);
			setUserCount(userCount);
			// triggerNote(message.user, message.text);
		});
	}, []);
	const justSayHi = () => {
		console.log('sayHiLogin', userName);
		setAlreadySayHi(true);
		socket.emit('sayHiLogin', userName);
	};
	return (
		<div>
			<Switch
				checkedChildren="I'm the Host"
				unCheckedChildren="Audience"
				checked={asHost}
				onChange={onSwitch}
			/>&nbsp;&nbsp;
			<Switch checkedChildren="On Air" unCheckedChildren="Offline" checked={isOnAir} />&nbsp;&nbsp;
			{alreadySayHi ? (
				<Badge count={userCount} style={{ backgroundColor: '#52c41a' }} title="Total attendee" />
			) : (
				<Button type="primary" onClick={justSayHi}>
					Say Hi
				</Button>
			)}
		</div>
	);
}

export default MyStatus;
