import React, { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import { Button } from 'antd';
import UserStore from '../service/UserStore';
import { socket } from '../service/socket';

export default ({ url, title }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    socket.on('openALinkEmit', (url) => {
      setIsOpen(true);
      window.openedWindow = window.open(url, 'wwnow');
    });
    socket.on('closeALinkEmit', () => {
      console.log('closeALinkEmit');
      setIsOpen(false);
      window.openedWindow && window.openedWindow.close();
    });
  }, []);
  const openALink = () => {
    console.log('openALink', url);
    setIsOpen(true);
    socket.emit('openALink', url);
    window.openedWindow = window.open(url, 'wwnow');
  };
  const closeALink = () => {
    setIsOpen(false);
    console.log('closeALink');
    window.openedWindow && window.openedWindow.close();
    socket.emit('closeALink');
    // window.openedWindow.close();
  };
  return isOpen ? (
    <Button type="primary" onClick={closeALink}>
      Close {title}
    </Button>
  ) : (
    <Button type="primary" onClick={openALink}>
      Open {title}
    </Button>
  );
};
