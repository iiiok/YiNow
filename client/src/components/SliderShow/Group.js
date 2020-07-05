import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Button, Divider, List, Avatar, Col, Row, Card } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { socket } from '../../service/socket';
import { movice } from '../../service/dummyDate';

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
	const voteFor = (id) => {
		socket.emit('voteFor', id);
		console.log('vote For No. ', id);
		// setVisible(true);
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
		<div style={{marginTop:"-24px"}}>
			<List
				grid={{
					gutter: 12,
					xs: 2,
					sm: 3,
					md: 3,
					lg: 4,
					xl: 4,
					xxl: 5
				}}
				dataSource={movice}
				renderItem={(item) => (
					<List.Item>
						<Card title={item.title}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '420px'
								}}
							>
								<img src={item.img} style={{ width: '100%', maxHeight: '282px' }} />
								<p>
									{item.des} <br />
									<a onClick={showDrawer}>View more..</a>
								</p>
								<Button
									type="primary"
									shape="round"
									onClick={() => voteFor(item.id)}
									icon={<LikeOutlined />}
									style={{ width: '50%', margin: '0 auto' }}
								>
									Vote
								</Button>
							</div>
						</Card>
					</List.Item>
				)}
			/>
			<Drawer width={740} placement="right" closable={false} onClose={onClose} visible={visible}>
				<h1> 功夫 (2004) </h1>

				<Divider />
				<div className="article-content">
					<p>
						<span className="bjh-p">
							个人觉得《功夫》这个电影是周星驰拍摄的最好的一部（个人认为），这部电影心也是，兼主演、导演、编剧、制片人，等多重身份于一身，通过《功夫》这部电影也是让，周星驰的才华展现得淋漓尽致。
						</span>
					</p>
					<div className="img-container">
						<img
							className="large"
							data-loadfunc="0"
							src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=65414431,163225348&amp;fm=173&amp;app=25&amp;f=JPEG"
							data-loaded="0"
						/>
					</div>
					<p>
						<span className="bjh-p">
							这部电影在2004年左右上映，周星驰在这部电影当中，不再注重自己的个人表演，更多的是注重于团队合作和影片的整体创作，该影片在大陆的票房为1.7亿左右，成为了当年年度票房的冠军，而在香港的票房收入为6000万，在当时也是香港年度票房的冠军，而且还打破了《少林足球》保持的票房纪录，拿下了香港金像奖最佳影片奖，台湾电影金马奖，最佳导演奖等等。
						</span>
					</p>
					<div className="img-container">
						<img
							className="large"
							data-loadfunc="0"
							src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2796222741,160069392&amp;fm=173&amp;app=25&amp;f=JPEG"
							data-loaded="0"
						/>
					</div>
					<p>
						<span className="bjh-p">
							而且《功夫》这部电影在国外还是得到了一致的肯定。据统计在04年的时候《功夫》在全球总票房，高达1.2零五亿左右，创下了多个国家和地区的华语电影票房纪录，并入围美国金球奖，英国电影学院奖最佳外语片，获得了美国评论家选择奖等多个奖项，更被《时代周刊》评为2005年十大佳片之一。
						</span>
					</p>
					<div className="img-container">
						<img
							className="large"
							data-loadfunc="0"
							src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1265023210,3390645694&amp;fm=173&amp;app=25&amp;f=JPEG"
							data-loaded="0"
						/>
					</div>
					<p>
						<span className="bjh-p">
							在这部电影技术测试上面，不管是音乐还是特效，都在当时达到了一个非常高的水准，并且这部电影里面的特效也是非常精彩的。而且这部影片在笑点方面，经典桥段非常的多，包租婆的狮吼、酱爆的屁股、还有停水等等。星爷把多种的元素都混合到这步功夫里面，有小说的人物，还有武功帮派，延续了漫画式的设定，从一开始斧头帮的挑衅，还有三英的出手，三人对战琴师，琴师对战包租公、包租婆，包租公和包租婆和火云邪神的大战，还有阿星和邪神大战，这里面的种种描写的非常精彩。
						</span>
					</p>
					<div className="img-container">
						<img
							className="large"
							data-loadfunc="0"
							src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1696965958,374899705&amp;fm=173&amp;app=25&amp;f=JPEG"
							data-loaded="0"
						/>
					</div>
					<p>
						<span className="bjh-p">网友认为功夫这部影片是周星驰电影生涯至今为止的巅峰，尤其是作为导演，这一点不光粉丝和观众承认，而且连业内的人士都一致的认可。</span>
					</p>
				</div>

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
