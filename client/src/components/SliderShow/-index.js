import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from 'react';
import { Carousel, Layout, Menu, Breadcrumb, Switch } from 'antd';
import { Result, Button, Divider, Collapse, Card } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import Group from './Group';
import Ending from './Ending';
import MySteps from './MySteps';
import YoutubeVideo from './YoutubeVideo.js';
import SayHi from '../SayHi/sayhi';
import { socket } from '../../service/socket';
import { debounce } from 'lodash';
import queryString from 'query-string';
import MyAccordion from '../Accordion/Accordion';
import IXLContent from '../../pages/IXLContent';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const sentScrollUpdate = (position) => {
	socket.emit('syncScrollPosition', position);
};
const scrollUpdate = debounce(sentScrollUpdate, 100);

const settings = {
	dots: true,
	infinite: true,
	speed: 1000,
	adaptiveHeight: true,
	slidesToShow: 1,
	centerMode: true,
	centerPadding: '0px',
	slidesToScroll: 1,
	swipeToSlide: true
};

let positionY = 0;

const UserInfoConText = createContext({ userName: 'ivan' });

function SliderParent({ location }) {
	const { userName, isHost } = queryString.parse(location.search);

	const [ asHost, setHost ] = useState(false);
	useEffect(
		() => {
			setHost(isHost === 'true');
		},
		[ isHost ]
	);

	const [ slideIndex, setSlideIndex ] = useState(1);
	const onSliderClick = (e) => {
		console.log('object', e.key);
		setSlideIndex(e.key);
		if (e.key) {
			socket.emit('updateSliderIndex', e.key, () => setSlideIndex(e.key));
		}
	};

	useEffect(
		() => {
			socket.on('updateSliderIndexEmit', (key) => {
				console.log('updateSliderIndexEmit', key.sliderIndex, new Date().getTime());
				setSlideIndex(key.sliderIndex);
			});
		},
		[ slideIndex ]
	);

	const [ scrollPosition, setSrollPosition ] = useState(0);

	const handleScroll = useCallback(() => {
		const position = window.pageYOffset;
		// console.log('scrollPosition', scrollPosition); //這里讀不了

		if (Math.abs(positionY - position) > 30) {
			scrollUpdate(position, () => {});
			// scrollUpdate(position, (value)=> setSrollPosition(value));
			console.log('positionY - position', positionY, position);
			positionY = position;
			// setSrollPosition(98);
			// console.log('scrollPosition-in', scrollPosition);
		}
	}, []);

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
	);
	useEffect(
		() => {
			if (asHost) {
				window.addEventListener('scroll', handleScroll, { passive: true });
			}

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		},
		[ asHost ]
	);
	const showUserName = 'Hi， ' + userName;
	return (
		<UserInfoConText.Provider
			value={{
				username: userName
			}}
		>
			<Layout>
				<Header className="header">
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '2' ]}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
						<Sider className="site-layout-background" width={200}>
							<Card size="small" title={showUserName}>
								<p>
									You are:{' '}
									<Switch
										checkedChildren="Host"
										unCheckedChildren="觀眾"
										checked={asHost}
										onChange={() => setHost(!asHost)}
									/>
								</p>
							</Card>

							<Links onSliderClick={onSliderClick} selectedKeys={[ slideIndex.toString() ]} />

							{/* scrollPosition: {scrollPosition} */}
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							{slideIndex == 6 && <YoutubeVideo />}
							{slideIndex == 7 && <IXLContent />}
							{slideIndex == 8 && <Ending />}
							{slideIndex < 6 && (
								<div>
									<Slider slideIndex={slideIndex} />
									<Divider />

									{slideIndex == 1 && (
										<Card>
											<SayHi />
										</Card>
									)}
								</div>
							)}
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					{/* <img src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png" /> */}
					<br /> WwNow.com ©2020 Created by EPAM group.
				</Footer>
			</Layout>
		</UserInfoConText.Provider>
	);
}

function Links({ onSliderClick, selectedKeys }) {
	console.log('selectedKeys', selectedKeys);
	const [ currentMenu, setCurrentMent ] = useState(selectedKeys);
	useEffect(
		() => {
			setCurrentMent(selectedKeys);
		},
		[ selectedKeys ]
	);
	console.log(currentMenu);
	return (
		<React.Fragment>
			<Menu
				mode="inline"
				onSelect={onSliderClick}
				//   defaultOpenKeys={currentMenu}
				//   defaultSelectedKeys={currentMenu}
				selectedKeys={currentMenu}
				defaultOpenKeys={[ 'sub1' ]}
				// style={{ height: '100%' }}
			>
				<SubMenu key="sub1" icon={<UserOutlined />} title="PPT Meeting">
					<Menu.Item key="1">Welcome</Menu.Item>
					<Menu.Item key="2">JavaScript async</Menu.Item>
					<Menu.Item key="3">Steps</Menu.Item>
					<Menu.Item key="4">Our Team</Menu.Item>
				</SubMenu>
				<Menu.Item key="6" icon={<YoutubeOutlined />}>
					Videos
				</Menu.Item>
				<Menu.Item key="7" icon={<LaptopOutlined />}>
					iLearning
				</Menu.Item>
				<Menu.Item key="8" icon={<NotificationOutlined />}>
					The Ending
				</Menu.Item>
			</Menu>
		</React.Fragment>
	);
}

function Slider({ slideIndex }) {
	const sliderX = useRef();

	const [ drawerVisable, setDrawerVisable ] = useState(false);
	const { username } = useContext(UserInfoConText);
	console.log('username', username);
	useEffect(() => {
		socket.on('openDrawerEmit', (type) => {
			console.log('openDrawerEmit outside', type);
			setDrawerVisable(type);
		});
	}, []);
	useEffect(
		() => {
			sliderX.current.slick.slickGoTo(slideIndex - 1);
			console.log('slideIndex', slideIndex);
		},
		[ slideIndex ]
	);

	return (
		<Carousel ref={sliderX} {...settings}>
			<div>
				<Card title={'Hi, ' + username + '. Welcome to the meeting.'}>
					<p>
						<img src="https://wowslider.com/sliders/demo-77/data1/images/road220058.jpg" />
					</p>
					<p className="flex-caption">Adventurer Cheesecake Brownie</p>
				</Card>
			</div>
			<div>
				<MyAccordion />
			</div>
			<div>
				<MySteps />
				<p className="flex-caption">Adventurer Cheesecake Brownie</p>
			</div>

			{/* <div>
				<YoutubeVideo />
			</div> */}
			<div>
				<Group drawerVisable={drawerVisable} />
				<Result
					icon={<SmileOutlined />}
					title="Great, we have done all the operations!"
					extra={<Button type="primary">Next</Button>}
				/>
			</div>
		</Carousel>
	);
}

export default SliderParent;
