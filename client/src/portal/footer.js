import React, { useState, useEffect } from 'react';
import { Carousel, Layout, Menu, Breadcrumb, Switch } from 'antd';
import { Result, Button, Divider, Input, Card } from 'antd';

import { socket } from '../service/socket';
import { observer, useObservable, useLocalStore } from 'mobx-react';

import UserStore from '../service/UserStore';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

// const UserInfoConText = createContext({ userName: 'ivan' });

export default observer(({ userName }) => {
	// const store = useContext(UserStore);
	const [ message, setMessage ] = useState('');
	// const [ messages, setMessages ] = useState([]);

	// useEffect(() => {
	// 	socket.on('updateSliderIndexEmit', (key) => {
	// 		console.log('updateSliderIndexEmit', key.sliderIndex, new Date().getTime());
	// 	});
	// }, []);
	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: '#1890ff'
			}}
		/>
	);
	// const { username } = useContext(UserInfoConText);
	const sendMessage = (message) => {
		if (message) {
			socket.emit('sendNotice', { userName, message }, () => setMessage(''));
		}
	};
	return (
		<Layout>
			<Search
				placeholder="Sent a notification message to @All"
				enterButton="Sent"
				size="large"
				style={{ width: '800px', margin: '0 auto 0 auto' }}
				suffix={suffix}
				value={message}
				onChange={(value) => setMessage(value.value)}
				onSearch={sendMessage}
			/>
			<Footer style={{ textAlign: 'center' }}>
				{/* <img src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png" /> */}
				<br /> WwNow.com ©2020 Created by EPAM System.
			</Footer>
		</Layout>
	);
});
