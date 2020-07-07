import React from 'react';
// import YouTube from '@u-wave/react-youtube';
import YouTube from 'react-youtube';
import { Divider } from 'antd';
import { Tabs, Select, Button, Space, Row, Col, Card } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { socket } from '../../service/socket';

const { TabPane } = Tabs;
const { Option } = Select;

const videos = [
	{ index: 0, id: 'RMN_bkZ1KM0', name: 'JavaScript Best Practices' },
	{ index: 1, id: 'x7Xzvm0iLCI', name: 'Loops - Code This, Not That' },
	{ index: 2, id: 'vn3tm0quoqE', name: 'Async Await Episode I Promised' }
];

const hashVideoRx = /^#!\/video\/(\d)$/;
const hash = typeof window.location !== 'undefined' ? window.location.hash : ''; // eslint-disable-line no-undef
// const defaultVideo = hashVideoRx.test(hash) ? parseInt(hash.replace(hashVideoRx, '$1'), 10) : 0;

class YoutubeVideo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videoIndex: '0',
			suggestedQuality: 'auto',
			volume: 1,
			showControl: false,
			paused: false
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleOnReady = this.handleOnReady.bind(this);
		this.handlePlayerPause = this.handlePlayerPause.bind(this);
		this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
		this.handleVolume = this.handleVolume.bind(this);
	}

	selectVideo(index) {
		console.log('syncShowingTab', index);
		this.setState({ videoIndex: index });
		socket.emit('syncShowingTab', index);
	}

	handlePause(event) {
		this.setState({
			paused: !this.state.paused
			// paused: event.target.checked
		});
		socket.emit('syncVideoPlay', !this.state.paused);
	}
	handleOnReady(event) {
		setTimeout(() => {
			this.setState({
				showControl: true,
				paused: true
				// !this.state.paused
				// paused: event.target.checked
			});
		}, 1000);
	}

	handlePlayerPause() {
		this.setState({ paused: true });
		socket.emit('syncVideoPlay', true);
	}

	handlePlayerPlay() {
		this.setState({ paused: false });
		socket.emit('syncVideoPlay', false);
	}

	handleVolume(event) {
		const volume = parseFloat(event.target.value);
		this.setState({
			volume: volume
		});
		socket.emit('syncVideoVolume', volume);
	}

	componentDidMount() {
		console.log('init syncShowingTabEmit');
		socket.on('syncVideoPlayEmit', (key) => {
			// console.log('syncVideoPlayEmit', key);
			this.setState({ paused: key });
		});
		socket.on('syncShowingTabEmit', (key) => {
			// console.log('syncShowingTabEmit', key);
			this.setState({ videoIndex: key });
		});
		socket.on('syncVideoVolumeEmit', (volume) => {
			// console.log('syncVideoVolumeEmit', syncVideoVolumeEmit);
			this.setState({
				volume: volume
			});
		});
	}

	render() {
		const { videoIndex, volume, paused, showControl } = this.state;

		const video = videos[videoIndex];
		const opts = {
			height: '390',
			width: '640',
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 1
			}
		};
		return (
			<div className="row">
				<YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
				<Card title={'YouTube Videos'}>
					<Tabs
						tabPosition="right"
						onChange={(TabIndex) => this.selectVideo(TabIndex)}
						activeKey={videoIndex}
					>
						{videos.map((choice, index) => (
							<TabPane tab={choice.name} key={index}>
								<h1>
									"{choice.name}" is {paused ? 'on held.' : 'playing.'}
								</h1>

								{/* {choice.id == index && ( */}
								<YouTube
									video={choice.id}
									height={580}
									autoplay
									width="100%"
									onReady={this.handleOnReady}
									controls={true}
									volume={volume}
									allow="autoplay; encrypted-media"
									paused={paused}
									allowFullscreen
									onPause={this.handlePlayerPause}
									onPlaying={this.handlePlayerPlay}
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
									onClick={this.handlePause}
								>
									{paused ? 'Play' : 'Stop'} video
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
									onChange={this.handleVolume}
								/>
							</Col>
							<Col lg={{ span: 4 }} />
						</Row>
					)}

					{/* <p>
						<label htmlFor="paused">
							<input type="checkbox" id="paused" checked={paused} onChange={this.handlePause} />
							<span>Paused</span>
						</label>
					</p> */}
				</Card>
			</div>
		);
	}
	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}

export default YoutubeVideo;
