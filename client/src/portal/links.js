import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Button, Divider, Switch, Card } from 'antd';
import {
	UserOutlined,
	LaptopOutlined,
	FundProjectionScreenOutlined,
	NotificationOutlined,
	ReadOutlined,
	YoutubeOutlined,
	LineChartOutlined
} from '@ant-design/icons';
import { socket } from '../service/socket';
const { SubMenu } = Menu;
const { Sider } = Layout;

function Links({ onSliderClick, selectedKeys, userName, swithcMenu, isMenuOn, asHost }) {
	console.log('selectedKeys', selectedKeys);
	const [ currentMenu, setCurrentMent ] = useState(selectedKeys);
	// const [ linksSwitch, setLinksSwitch ] = useState(isMenuOn);
	useEffect(
		() => {
			setCurrentMent(selectedKeys);
		},
		[ selectedKeys ]
	);

	console.log(currentMenu);
	return (
		<Sider className="site-layout-background" width={200}>
			<Card size="small" title={userName}>
				{asHost && (
					<Switch
						checkedChildren="Show this"
						unCheckedChildren="Hide this"
						checked={isMenuOn}
						onChange={swithcMenu}
					/>
				)}
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
					<Menu.Item key="4">Vote for Best Movice</Menu.Item>
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
				<SubMenu key="sub2" icon={<UserOutlined />} title="Business">
					<Menu.Item key="11" icon={<ReadOutlined />}>
						Tradition PPT
					</Menu.Item>
					<Menu.Item key="12" icon={<LineChartOutlined />}>
						Charts
					</Menu.Item>
					<Menu.Item key="13" icon={<FundProjectionScreenOutlined />}>
						TV Show
					</Menu.Item>
					<Menu.Item key="14">Vote for Best Movice</Menu.Item>
				</SubMenu>
				<SubMenu key="sub3" icon={<UserOutlined />} title="Page templates">
					<Menu.Item key="31">Coming Soon</Menu.Item>
					<Menu.Item key="32">JavaScript async</Menu.Item>
					<Menu.Item key="33">Steps</Menu.Item>
					<Menu.Item key="34">Our Team</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default Links;
