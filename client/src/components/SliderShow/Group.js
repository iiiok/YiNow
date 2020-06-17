import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Breadcrumb } from 'antd';
import { Result, Button, Divider, Modal } from 'antd';
import { Drawer, List, Avatar, Col, Row } from 'antd';
import { socket } from '../../service/socket';

const DescriptionItem = ({ title, content }) => (
	<div className="site-description-item-profile-wrapper">
		<p className="site-description-item-profile-p-label">{title}:</p>
		{content}
	</div>
);

const Group = ({ drawerVisable }) => {
	console.log('defin Ending', drawerVisable);

	const [ visible, setVisible ] = useState(false);
	const showDrawer = () => {
		socket.emit('openDrawer', true);
		setVisible(true);
	};

	const onClose = () => {
		socket.emit('openDrawer', false);
		setVisible(false);
	};

	useEffect(
		() => {
			console.log('run useEffect -drawerVisable', drawerVisable);
			setVisible(drawerVisable);
		},
		[ drawerVisable ]
	);

	return (
		<div>
			<List
				dataSource={[
					{
						name: 'Lily'
					},
					{
						name: 'Lily'
					}
				]}
				bordered
				renderItem={(item) => (
					<List.Item
						key={item.id}
						actions={[
							<a onClick={showDrawer} key={`a-${item.id}`}>
								View Profile
							</a>
						]}
					>
						<List.Item.Meta
							avatar={
								<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
							}
							title={<a href="https://ant.design/index-cn">{item.name}</a>}
							description="Progresser XTech"
						/>
					</List.Item>
				)}
			/>

			<Drawer width={640} placement="right" closable={false} onClose={onClose} visible={visible}>
				<p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
					User Profile
				</p>
				<p className="site-description-item-profile-p">Personal</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title="Full Name" content="Lily" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Account" content="AntDesign@example.com" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title="City" content="HangZhou" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Country" content="China🇨🇳" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title="Birthday" content="February 2,1900" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Website" content="-" />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem title="Message" content="Make things as simple as possible but no simpler." />
					</Col>
				</Row>
				<Divider />
				<p className="site-description-item-profile-p">Company</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title="Position" content="Programmer" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Responsibilities" content="Coding" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem title="Department" content="XTech" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Supervisor" content={<a>Lin</a>} />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title="Skills"
							content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
						/>
					</Col>
				</Row>
				<Divider />
				<p className="site-description-item-profile-p">Contacts</p>
				<Row>
					<Col span={12}>
						<DescriptionItem title="Email" content="AntDesign@example.com" />
					</Col>
					<Col span={12}>
						<DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<DescriptionItem
							title="Github"
							content={
								<a href="http://github.com/ant-design/ant-design/">github.com/ant-design/ant-design/</a>
							}
						/>
					</Col>
				</Row>
			</Drawer>
		</div>
	);
};

export default React.memo(Group);