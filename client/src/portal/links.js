import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Button, Divider, Switch, Card } from 'antd';
import {
	UserOutlined,
	ClusterOutlined,
	ExperimentOutlined,
	CheckOutlined,
	ToolOutlined,
	SafetyOutlined,
	EnvironmentOutlined,
	GlobalOutlined,
	QuestionCircleOutlined,
	LaptopOutlined,
	FundProjectionScreenOutlined,
	IssuesCloseOutlined,
	FastForwardOutlined,
	QrcodeOutlined,
	NotificationOutlined,
	ReadOutlined,
	AudioOutlined,
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
						checkedChildren="Showing"
						unCheckedChildren="Hiding"
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
			>
				<Menu.Item key="1" icon={<EnvironmentOutlined />}>
					Welcome
				</Menu.Item>
				<Menu.Item key="11" icon={<ReadOutlined />}>
					Simple Example
				</Menu.Item>
				<Menu.Item key="22" icon={<QuestionCircleOutlined />}>
					Reasons Why
				</Menu.Item>
				<SubMenu key="sub3" icon={<ExperimentOutlined />} title="Behind the Scene">
					<Menu.Item key="31" icon={<ToolOutlined />}>
						WebSocket & socket.io
					</Menu.Item>
					<Menu.Item key="32" icon={<ClusterOutlined />}>
						Architecture
					</Menu.Item>
					<Menu.Item key="35" icon={<GlobalOutlined />}>
						Iframe Pages
					</Menu.Item>
					<Menu.Item key="34" icon={<FastForwardOutlined />}>
						What's Next
					</Menu.Item>
				</SubMenu>
				<SubMenu key="sub1" icon={<QrcodeOutlined />} title="Business Scenarios">
					<Menu.Item key="2">JavaScript async</Menu.Item>
					<Menu.Item key="12" icon={<LineChartOutlined />}>
						Business Meeting
					</Menu.Item>
					<Menu.Item key="14" icon={<SafetyOutlined />}>
						Intro & Vote
					</Menu.Item>
					<Menu.Item key="15" icon={<AudioOutlined />}>
						Concert Sync
					</Menu.Item>
					<Menu.Item key="13" icon={<FundProjectionScreenOutlined />}>
						TV Sync
					</Menu.Item>
					<Menu.Item key="7" icon={<LaptopOutlined />}>
						iLearning
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="6" icon={<YoutubeOutlined />}>
					Videos
				</Menu.Item>

				<Menu.Item key="8" icon={<IssuesCloseOutlined />}>
					The Ending
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default Links;
