import React from 'react';
import { List, Avatar } from 'antd';
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
	<div className="textContainer">
		{users ? (
			<div>
				<h1>People currently chatting:</h1>
				<div className="activeContainer">
					<List
						itemLayout="horizontal"
						dataSource={users}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={
										<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
									}
									title={item.name}
								/>
								<img alt="Online Icon" src={onlineIcon} />
							</List.Item>
						)}
					/>
				</div>
			</div>
		) : null}
	</div>
);

export default TextContainer;
