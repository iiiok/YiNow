import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from 'react';
import { Carousel, Layout, Menu, Breadcrumb, Switch } from 'antd';
import { Result, Button, Divider, Collapse, Card } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import Group from './Group';
import MySteps from './MySteps';
import YoutubeVideo from './YoutubeVideo.js';
import { socket } from '../../service/socket';
import { debounce } from 'lodash';

const sentScrollUpdate = (position) => {
	socket.emit('syncScrollPosition', position);
};

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

const UserInfoConText = createContext({ userName: 'ivan' });

function PPTSlider({ slideIndex }) {
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
		<Card title={'Welcome to the meeting.'}>
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
		</Card>
	);
}

export default PPTSlider;
