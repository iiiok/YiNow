import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'antd';
import { socket } from '../service/socket';

function MyStatus({ asHost, onSwitch }) {
	const [ isOnAir, setIsOnAir ] = useState(true);

	// const onChangeStep = (key) => {
	// 	socket.emit('setHost', key);
	// 	setHost(key);
	// };
	useEffect(() => {
		socket.on("connect",function() {
			console.log("connect");
			setIsOnAir(true);
		});
		// socket.on("ping",function() {
		// 	console.log("send a ping");
		// 	setIsOnAir(false);
		// });
		socket.on("pong",function() {
			console.log("received pong");
			setIsOnAir(true);
		});
		socket.on("connect_error",function() {
			console.log("connect_error ");
			setIsOnAir(false);
		});
		socket.on("disconnect",function() {
			console.log("disconnect ");
			setIsOnAir(false);
		});
	}, []);

	return (
		<div>
			<Switch
				checkedChildren="I'm the Host"
				unCheckedChildren="Audience"
				checked={asHost}
				onChange={() => onSwitch(!asHost)}
			/>&nbsp;&nbsp;
			<Switch checkedChildren="On Air" unCheckedChildren="Offline" checked={isOnAir} />
		</div>
	);
}

export default MyStatus;
