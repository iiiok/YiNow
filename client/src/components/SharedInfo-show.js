import React, { useState, useEffect } from 'react';
import { Modal, Drawer, Button, Input, Divider, Col, Row } from 'antd';
import { socket } from '../service/socket';

export default ({ isOpen, onSwitch }) => {
  // const [ showDrawer, setDrawer ] = useState(isOpen);
  // const imgArr = [];
  const [ imgArr, setImgArr ] = useState([]);
  console.log('sharedInfoShow redefined');
  const [ sharedInfoShow, setSharedInfoShow ] = useState(false);
  console.log('isOpen', isOpen);
  useEffect(() => {
    socket.on('sendAImageEmit', ({ user, imgUrl }) => {
      console.log('got a sendAImageEmit Emit', user, imgUrl);
      setImgArr((imgArr) => [
        {
          sender: user,
          imgUrl: imgUrl
        },
        ...imgArr
      ]);
      // setSharedInfoShow(true);
      onSwitch(true);
    });
  }, []);

  return (
    <Drawer
      // placement="bottom"
      title="Shared Screen"
      width={'80%'}
      // closable={false}
      // onClose={() => setSharedInfoShow(false)}
      onClose={() => onSwitch(false)}
      visible={isOpen}
    >
      {imgArr.map(({ sender, imgUrl }, index) => (
        <div key={index}>
          <h3>
            <u>
              <i>{sender}</i>
            </u>
            {'  '}post a picture:
          </h3>
          {imgUrl && <img src={imgUrl} />}
          <Divider />
        </div>
      ))}
    </Drawer>
  );
};
