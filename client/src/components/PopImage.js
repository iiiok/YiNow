import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { socket } from '../service/socket';

export default ({ picUrl, title }) => {
  const [ showModal, setShowModal ] = useState(false);
  // const [ picUrl, setPicUrl ] = useState('/images/lecture_laptop.jpg');

  const openModal = () => {
    setShowModal(true);
    socket.emit('setShowPicModal', { url: picUrl, setVisible: true });
  };
  useEffect(() => {
    console.log('on(setShowPicModal)');
    socket.on('setShowPicModalEmit', ({ url, setVisible }) => {
      console.log('got a setShowModal Emit', url, setVisible);
      picUrl === url && setShowModal(setVisible);
    });
  }, []);
  const handleOk = () => {
    setShowModal(false);
    socket.emit('setShowPicModal', { url: picUrl, setVisible: false });
  };

  return (
    <div className="ws_ul">
      <img src={picUrl} width="100%" onClick={openModal} />
      <Modal visible={showModal} onOk={handleOk} onCancel={handleOk} width="86%">
        <h3> {title} </h3>
        <img src={picUrl} className="popup_image" />
      </Modal>
    </div>
  );
};
