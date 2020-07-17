import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Button, Badge, Tag } from 'antd';
import { socket } from '../service/socket';
import { notification } from 'antd';
import { debounce } from 'lodash';
import { SmileOutlined } from '@ant-design/icons';
let positionY = 0;
const sentScrollUpdate = (position) => {
	socket.emit('syncScrollPosition', position);
};
const scrollUpdate = debounce(sentScrollUpdate, 1);

function MyStatus({ asHost, userName, onSwitch }) {
	const [ isOnAir, setIsOnAir ] = useState(true);
	const [ alreadySayHi, setAlreadySayHi ] = useState(false);
	const [ userCount, setUserCount ] = useState(1);
	const [ asScroller, setAsScroller ] = useState(false);

	const key = 'sayHiMsg';
	const triggerNote = (user, text) => {
		console.log('triggerNote ');
		notification.open({
			key,
			message: 'Message from (' + user + ')',
			description: text
		});
	};

	//Receive and response with scrolling
	const [ scrollPosition, setSrollPosition ] = useState(0);
	useEffect(() => {
		socket.off('syncScrollPositionEmit').on('syncScrollPositionEmit', (key) => {
			console.log('syncScrollPositionEmit', key.newPosition);
			setSrollPosition(key.newPosition);
		});
	}, []);
	useEffect(
		() => {
			console.log('scroll to Position', scrollPosition);
			window.scrollTo(0, scrollPosition);
		},
		[ scrollPosition ]
	); //End of Receive and response with scrolling

	const handleScroll = useCallback(() => {
		const position = window.pageYOffset;
		// console.log('scrollPosition', scrollPosition); //這里讀不了

		if (Math.abs(positionY - position) > 30) {
			scrollUpdate(position, () => {});
			// scrollUpdate(position, (value)=> setSrollPosition(value));
			console.log('positionY - position', positionY, position);
			positionY = position;
			// console.log('scrollPosition-in', scrollPosition);
		}
	}, []);
	// useEffect(
	// 	() => {
	// 		if (asScroller) {
	// 			window.addEventListener('scroll', handleScroll, { passive: true });
	// 		}
	// 		return () => {
	// 			window.removeEventListener('scroll', handleScroll);
	// 		};
	// 	},
	// 	[ asScroller ]
	// );
	const onSetAsScroller = () => {
		setAsScroller(!asScroller);
		!asScroller
			? window.addEventListener('scroll', handleScroll, { passive: true })
			: window.removeEventListener('scroll', handleScroll);
	};
	useEffect(() => {
		socket.emit('sayHiLogin', userName);
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
			// triggerNote('New joiner');
		});
	}, []);
	const justSayHi = () => {
		console.log('sendNotice', userName);
		setAlreadySayHi(true);
		socket.emit('sendNotice', { userName: userName, message: 'Just say hi.' }, () => {});
	};
	return (
		<div>
			<Switch
				checkedChildren="I'm the Host"
				unCheckedChildren="Audience"
				checked={asHost}
				onChange={onSwitch}
			/>&nbsp;&nbsp;
			{asHost && (
				<Switch
					className="scroll_master"
					checkedChildren="Scroll Master"
					unCheckedChildren="Scroll Disable"
					checked={asScroller}
					onChange={onSetAsScroller}
				/>
			)}&nbsp;&nbsp;
			<Switch checkedChildren="On Air" unCheckedChildren="Offline" checked={isOnAir} />&nbsp;&nbsp;
			<Badge count={userCount} style={{ backgroundColor: '#52c41a' }} title="Total attendee" />&nbsp;&nbsp;
			{!alreadySayHi && (
				// <Button type="primary" onClick={justSayHi}>
				// 	Say Hi
				// </Button>
				<Tag icon={<SmileOutlined />} color="#55acee" onClick={justSayHi}>
					Say Hi
				</Tag>
			)}
		</div>
	);
}

export default MyStatus;
