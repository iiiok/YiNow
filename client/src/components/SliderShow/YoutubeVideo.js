import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { Divider } from 'antd';
import { Tabs, Select, Button, Row, Col, Card } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { socket } from '../../service/socket';
import { debounce } from 'lodash';

const { TabPane } = Tabs;
const { Option } = Select;

const videos = [
	{ index: 0, id: 'RMN_bkZ1KM0', name: 'JavaScript Best Practices' },
	{ index: 1, id: 'x7Xzvm0iLCI', name: 'Loops - Code This, Not That' },
	{ index: 2, id: 'vn3tm0quoqE', name: 'Async Await Episode I Promised' }
];
const handleVolumeUpdate = (volume) => {
	console.log('handleVolumeUpdate', volume);
	socket.emit('syncVideoVolume', volume);
};
const volumnUpdate = debounce(handleVolumeUpdate, 50);

export default () => {
	const [ videoIndex, setVideoIndex ] = useState('0');
	const [ isPlaying, setIsPlaying ] = useState(false);
	const [ player, setPlayer ] = useState(null);
	const [ volume, setvolume ] = useState(0.8);
	const [ showControl, setShowControl ] = useState(true);
	const onReady = (event) => {
		setPlayer(event.target);
	};

	const onPlayVideo = () => {
		if (player) {
			isPlaying ? player.pauseVideo() : player.playVideo();
		}
		setIsPlaying(!isPlaying);
		socket.emit('syncVideoPlay', !isPlaying);
	};
	// const onPlayVideoFun = (value) => {
	// 	console.log('onPlayVideoFun', value);
	// 	if (value !== isPlaying) {
	// 		socket.emit('syncVideoPlay', value);
	// 		setIsPlaying(value);
	// 	}
	// };

	const selectVideo = (index) => {
		console.log('syncShowingTab', index);
		console.log('videoIndex', videoIndex);

		setVideoIndex(index);
		socket.emit('syncShowingTab', index);
	};

	const handleVolume = (event) => {
		const volume = parseFloat(event.target.value);
		volumnUpdate(volume);
		setvolume(volume);
		player.setVolume(volume * 100);
	};

	useEffect(
		() => {
			if (player) {
				socket.off('syncVideoPlayEmit').on('syncVideoPlayEmit', (key) => {
					console.log('syncVideoPlayEmit', key);
					setIsPlaying(key);
					isPlaying ? player.pauseVideo() : player.playVideo();
				});
				socket.off('syncVideoVolumeEmit').on('syncVideoVolumeEmit', (volume) => {
					console.log('syncVideoVolumeEmit', volume);
					setvolume(volume);
					player && player.setVolume(volume * 100);
				});
			}
			socket.on('syncShowingTabEmit', (key) => {
				console.log('syncShowingTabEmit', key);
				setVideoIndex(key);
			});
		},
		[ player, isPlaying ]
	);

	return (
		<div className="row">
			<Card title={'YouTube Videos'}>
				<Tabs tabPosition="right" onChange={(TabIndex) => selectVideo(TabIndex)} activeKey={videoIndex}>
					{videos.map((choice, index) => (
						<TabPane tab={choice.name} key={index}>
							<h1>
								"{choice.name}" is {!isPlaying ? 'on held.' : 'playing.'}
							</h1>
							<YouTube
								containerClassName={'youtubeContainer'}
								videoId={choice.id}
								onReady={onReady}
								// onPlay={() => onPlayVideoFun(true)}
								// onPause={() => onPlayVideoFun(false)}

								// controls={true}
								// volume={volume}
								// paused={paused}
								// allowFullscreen
								// onPause={this.handlePlayerPause}
								// onPlaying={this.handlePlayerPlay}
							/>
						</TabPane>
					))}
				</Tabs>
				<Divider />
				{showControl && (
					<Row>
						<Col lg={{ span: 3, offset: 1 }}>
							<Button
								type="primary"
								icon={<PoweroffOutlined />}
								// loading={loadings[1]}
								onClick={onPlayVideo}
							>
								{!isPlaying ? 'Play' : 'Stop'} video
							</Button>
						</Col>
						<Col lg={{ span: 2, offset: 1 }} />
						<Col lg={{ span: 10 }}>
							<input
								type="range"
								value={volume}
								style={{ width: '100%' }}
								min={0}
								max={1}
								step={0.01}
								onChange={handleVolume}
							/>
						</Col>
						<Col lg={{ span: 4 }} />
					</Row>
				)}
			</Card>
		</div>
	);
};
