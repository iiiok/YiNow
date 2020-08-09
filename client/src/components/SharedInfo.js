import React, { useState, useEffect } from 'react';
import { Modal, Drawer, Button, Input, Divider } from 'antd';
import { socket } from '../service/socket';
const { Search } = Input;

export default ({ isOpen, onClose, userName }) => {
  // const [ showDrawer, setDrawer ] = useState(isOpen);
  // const imgArr = [];
  const [ imgArr, setImgArr ] = useState([]);
  const [ imgUrl, setImgUrl ] = useState(undefined);
  // const [ sender, setSender ] = useState(undefined);
  const [ showChildrenDrawer, setChildrenDrawer ] = useState(false);
  // const [ picUrl, setPicUrl ] = useState('/images/lecture_laptop.jpg');

  // const showDrawer  = () => {
  // 	setShowModal(true);
  // 	socket.emit('setShowPicModal', { url: picUrl, setVisible: true });
  // };
  useEffect(() => {
    socket.on('sendAImageEmit', ({ user, imgUrl }) => {
      console.log('got a sendAImageEmit Emit', user, imgUrl);
      setChildrenDrawer(true);
      isOpen = true;
      setImgArr(imgArr.push(user,imgUrl));
      // setImgUrl(imgUrl);
      // setSender(user);
      // picUrl === url && setShowModal(setVisible);
    });
  }, []);
  // const handleOk = () => {
  // 	setShowModal(false);
  // 	socket.emit('setShowPicModal', { url: picUrl, setVisible: false });
  // };
  const sendPic = (imgUrl) => {
    if (imgUrl) {
      socket.emit('sendAImage', { userName, imgUrl }, () => setImgUrl(undefined));
    }
  };
  return (
    <Drawer title="Image sharing" width={320} onClose={onClose} visible={isOpen}>
      length={imgArr.length}
       {
imgArr.map((sender, imgUrl)=><div>

    <h3><u><i>{sender}</i></u>post a picture: </h3>
          {imgUrl && <img src={imgUrl} />}{imgUrl && <img src={imgUrl} />}
  </div>
)
        }
      <Search
        placeholder="Or enter a pic address"
        enterButton="Sent"
        size="large"
        style={{ width: '100%', margin: '0 auto 10px auto' }}
        value={imgUrl}
        onChange={(value) => setImgUrl(value.value)}
        onSearch={sendPic}
      />
      <Divider />
<Button type="primary" onClick={() => setChildrenDrawer(!showChildrenDrawer)}>
        Upload an image
      </Button>
      <Drawer
        title="Shared Screen"
        width={'80%'}
        closable={false}
        onClose={() => setChildrenDrawer(false)}
        visible={showChildrenDrawer}
      >length={imgArr.length}
        {
imgArr.map((sender, imgUrl)=><div>

    <h3><u><i>{sender}</i></u>post a picture: </h3>
          {imgUrl && <img src={imgUrl} />}{imgUrl && <img src={imgUrl} />}
  </div>
)
        }
        

      </Drawer>
    </Drawer>
  );
};
