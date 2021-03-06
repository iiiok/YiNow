import React, { useState, useEffect } from 'react';
// import queryString from 'query-string';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { socket } from '../../service/socket';
import './Chat.css';

const Chat = ({ name }) => {
	// const [ name, setName ] = useState('ivan');
	const room = 'ChatRoom-1';
	const [ users, setUsers ] = useState([]);
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);

	useEffect(() => {
		// setName(name);

		socket.emit('join', { name, room }, (error) => {
			if (error) {
				alert(error);
			}
		});
	}, []);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [ ...messages, message ]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			console.log('sendMessage', message);
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
			<TextContainer users={users} />
		</div>
	);
};

export default Chat;
