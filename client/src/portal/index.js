import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from 'react';
import { Carousel, Layout, Menu, Breadcrumb, Switch } from 'antd';
import { Result, Button, Divider, Collapse, Card } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import { SmileOutlined } from '@ant-design/icons';
import Group from '../components/SliderShow/Group';
import Ending from '../pages/Ending';
import YiChart from '../pages/YiChart';
import RightList from '../pages/RightList';
import MySteps from '../components/SliderShow/MySteps';
import HostScript from '../components/TextView/HostScript';
import { paragraph1 } from '../service/dummyDate';
import YoutubeVideo from '../components/SliderShow/YoutubeVideo.js';
import SayHi from '../components/SayHi/sayhi';
import { socket } from '../service/socket';
import queryString from 'query-string';
import MyAccordion from '../components/Accordion/Accordion';
import IXLContent from '../pages/IXLContent';
import VotingSample from '../pages/voting-sample';
import MyStatus from './status';
import YiFooter from './footer';
import Links from './links';
import ExamplePPT from '../pages/Example-PPT';

import { observer, useObservable, useLocalStore } from 'mobx-react';
// import { observer } from 'mobx-react-lite';

import UserStore from '../service/UserStore';

const { Header, Content } = Layout;

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

const UserInfoConText = createContext();

export const Portal = observer(({ location }) => {
	const store = useContext(UserStore);
	const { userName } = queryString.parse(location.search);
	store.userName = userName;
	console.log('store.slideIndex', store.slideIndex);

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
				store.slideIndex = key.sliderIndex;
				console.log('updateSliderIndexEmit', key.sliderIndex, new Date().getTime());
				setSlideIndex(key.sliderIndex);
			});
		},
		[ slideIndex ]
	);

	useEffect(() => {
		socket.on('swithcMenuEmit', (val) => {
			console.log('swithcMenu ', val);
			store.isMenuOn = val;
		});
	}, []);
	return (
		<UserInfoConText.Provider
			value={{
				username: userName
			}}
		>
			<Layout>
				<Header className="header">
					<div id="logo">
						<img alt="logo" src="/images/Epam_Logo.png" />
					</div>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
						<Menu.Item key="1">Next Genaration of Meeting and Event</Menu.Item>
					</Menu>
					<div style={{ width: '40%' }} />
					<MyStatus
						asHost={store.asHost}
						userCount={store.userList.length}
						userName={userName}
						onSwitch={store.switchAsHost}
					/>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>Next Genaration of Meeting</Breadcrumb.Item>
						<Breadcrumb.Item>OnAir</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
						{(store.asHost || store.isMenuOn) && (
							<Links
								onSliderClick={onSliderClick}
								selectedKeys={[ slideIndex.toString() ]}
								userName={store.userName}
								swithcMenu={store.swithcMenu}
								asHost={store.asHost}
								isMenuOn={store.isMenuOn}
							/>
						)}
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							{slideIndex == 6 && <YoutubeVideo />}
							{slideIndex == 11 && <ExamplePPT />}
							{slideIndex == 31 && <RightList />}
							{slideIndex == 12 && <YiChart />}
							{slideIndex == 7 && <IXLContent />}
							{slideIndex == 8 && <Ending />}
							{slideIndex == 22 && <MySteps />}
							{slideIndex == 14 && <VotingSample />}
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
				<YiFooter userName={store.userName} />
			</Layout>
		</UserInfoConText.Provider>
	);
});

function Slider({ slideIndex }) {
	const store = useContext(UserStore);
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
					<HostScript script={paragraph1} asHost={store.asHost} />
					<p className="flex-caption">EPAM SYSTEM 2020</p>
				</Card>
			</div>
			<div>
				<MyAccordion />
			</div>
			<div>
				<MySteps />
				<p className="flex-caption">EPAM SYSTEM 2020</p>
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
