import React, { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import { Button } from 'antd';
import UserStore from '../service/UserStore';
import { socket } from '../service/socket';

const { Text, Paragraph } = Typography;

export default ({ url,title }) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const asHost = useContext(UserStore).asHost;

	useEffect(() => {
		socket.on('openALinkEmit', (url) => {
			// console.log('openALinkEmit', url);
			setIsOpen(true);
			window.openedWindow = window.open(url, 'wwnow');
		});
		socket.on('closeALinkEmit', () => {
			console.log('closeALinkEmit');
			setIsOpen(false);
			window.openedWindow && window.openedWindow.close();
		});
	}, []);
	const openALink = () => {
		console.log('openALink', url);
		// const url ='/coming-soon.html';
		setIsOpen(true);
		socket.emit('openALink', url);
		window.openedWindow = window.open(url, 'wwnow');
	};
	const closeALink = () => {
		setIsOpen(false);
		console.log('closeALink');
		window.openedWindow && window.openedWindow.close();
		socket.emit('closeALink');
		// window.openedWindow.close();
	};
	return (
		// asHost && (
		isOpen ? (
			<Button type="primary" onClick={closeALink}>
				Close {title}
			</Button>
		) : (
			<Button type="primary" onClick={openALink}>
				Open {title}
			</Button>
		)

		// )
	);
};