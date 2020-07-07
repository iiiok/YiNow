import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { Divider } from 'antd';
import { Tabs, Select, Button, Row, Col, Card } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { socket } from '../service/socket';
import { debounce } from 'lodash';

const handleVolumeUpdate = (volume) => {
	console.log('handleVolumeUpdate', volume);
	socket.emit('syncVideoVolume', volume);
};
const volumnUpdate = debounce(handleVolumeUpdate, 50);

export default () => {
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
		},
		[ player, isPlaying ]
	);

	return (
		<div className="row">
			<Card title={'YouTube Videos'}>
				<YouTube containerClassName={'youtubeContainer'} videoId={'gLLl3VbNFXg'} onReady={onReady} />

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
