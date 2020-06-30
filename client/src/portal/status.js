import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'antd';
import { socket } from '../service/socket';

function MyStatus({ asHost, onSwitch }) {
	const [ isOnAir, setIsOnAir ] = useState(false);

	// const onChangeStep = (key) => {
	// 	socket.emit('setHost', key);
	// 	setHost(key);
	// };

	useEffect(() => {
		socket.on('connection', () => {
			setIsOnAir(true);
		});
		var s = socket;
		console.dir(socket);
		console.log('con?', s.id);
	}, []);

	return (
		<div>
			I'm {asHost ? 'the ' : 'a '}
			<Switch
				checkedChildren="Host"
				unCheckedChildren="Audience"
				checked={asHost}
				onChange={() => onSwitch(!asHost)}
			/>&nbsp;&nbsp;
			<Switch checkedChildren="On Air" unCheckedChildren="Offline" checked={isOnAir} />
		</div>
	);
}

export default MyStatus;
