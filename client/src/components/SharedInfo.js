import React, { useState, useEffect } from 'react';
import { Modal, Drawer, Button, Input, Divider, Col, Row } from 'antd';
import { socket } from '../service/socket';
import OpenALink from '../components/OpenALink';
const { Search } = Input;

export default ({ isOpen, onClose, userName }) => {
  console.log('imgArr redefined');
  const [ imgUrl, setImgUrl ] = useState('');
  const [ showChildrenDrawer, setChildrenDrawer ] = useState(false);

  const sendPic = (imgUrl) => {
    if (imgUrl) {
      socket.emit('sendAImage', { userName, imgUrl }, () => {});
    }
    setImgUrl('');
  };
  return (
    <Drawer title="Post an Image" onClose={onClose} visible={isOpen} placement="bottom" height="150">
      <Row>
        <Col>
          <Button type="primary" onClick={() => setChildrenDrawer(!showChildrenDrawer)}>
            Upload an image
          </Button>
        </Col>
        <Col span={1} />
        <Col span={15}>
          <Search
            placeholder="Or enter a pic address"
            enterButton="Sent"
            size="large"
            style={{ width: '100%', margin: '0 auto 10px auto' }}
            value={imgUrl}
            allowClear
            onChange={(value) => setImgUrl(value.value)}
            onSearch={sendPic}
          />
        </Col>
        <Col span={1} />
        <Col>
          <OpenALink url="https://snipboard.io/" title="Screenshot" />
        </Col>
      </Row>
    </Drawer>
  );
};
