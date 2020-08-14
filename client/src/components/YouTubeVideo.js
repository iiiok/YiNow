import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { Divider } from 'antd';
import { Button, Row, Col, Card } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { socket } from '../service/socket';
import { debounce } from 'lodash';

const handleVolumeUpdate = (volume) => {
  console.log('handleVolumeUpdate', volume);
  socket.emit('syncVideoVolume', volume);
};
const volumnUpdate = debounce(handleVolumeUpdate, 50);

const _makeFullscreen = () => {
  // if (this.props.videoOpts.fullscreen === 1) {
  const playerElement = document.getElementById('widget2');
  const requestFullScreen =
    playerElement.requestFullScreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullScreen;
  if (requestFullScreen) {
    // requestFullScreen.bind(playerElement)();
    requestFullScreen.call(playerElement);
  }
  // }
};

export default ({ ytId, volumn, start }) => {
  const opts = {
    // height: '100%',
    // width: '100%',
    playerVars: {
      controls: 1,
      showinfo: 0,
      mute: 0,
      start: start
    }
  };
  console.log('playerVars', opts);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ player, setPlayer ] = useState(null);
  const [ volume, setvolume ] = useState(0.8);
  const [ showControl, setShowControl ] = useState(true);
  const onReady = (event) => {
    setPlayer(event.target);
  };

  useEffect(
    () => {
      if (player && !isNaN(volumn)) {
        player.setVolume(volumn);
      }
    },
    [ player ]
  );

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
          // _makeFullscreen();
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
    <Card>
      <YouTube containerClassName={'youtubeContainer'} videoId={ytId} onReady={onReady} opts={opts} id="widget2" />

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
  );
};
