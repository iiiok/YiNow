import React, { useState, useEffect } from 'react';
import { Carousel, Layout, Menu } from 'antd';
import { Result, Button, Divider, Switch, Card } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SmileOutlined, YoutubeOutlined } from '@ant-design/icons';
import { socket } from '../service/socket';
import { notification } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
var userName="XXX";

function Links({ onSliderClick, selectedKeys }) {
	console.log('selectedKeys', selectedKeys);
	const [ currentMenu, setCurrentMent ] = useState(selectedKeys);
	const [ linksSwitch, setLinksSwitch ] = useState(true);
	useEffect(
		() => {
			setCurrentMent(selectedKeys);
		},
		[ selectedKeys ]
	);
	console.log(currentMenu);
	return (
		<Sider className="site-layout-background" width={200}>
		<Card size="small" title={userName} >
		<Switch
				checkedChildren="Show this"
				unCheckedChildren="Hide this"
				checked={linksSwitch}
				onChange={setLinksSwitch} />
			</Card>
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
				<SubMenu key="sub2" icon={<UserOutlined />} title="Page templates">
					<Menu.Item key="11">Coming Soon</Menu.Item>
					<Menu.Item key="12">JavaScript async</Menu.Item>
					<Menu.Item key="13">Steps</Menu.Item>
					<Menu.Item key="14">Our Team</Menu.Item>
				</SubMenu>
			</Menu>
			</Sider>
	);
}

export default Links;
