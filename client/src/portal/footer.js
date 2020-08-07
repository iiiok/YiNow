import React, { useState, useEffect } from 'react';
import { Layout, Input } from 'antd';

import { socket } from '../service/socket';
import { observer } from 'mobx-react';

import UserStore from '../service/UserStore';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

// const UserInfoConText = createContext({ userName: 'ivan' });

export default observer(({ userName }) => {
  const [ message, setMessage ] = useState('');

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff'
      }}
    />
  );
  // const { username } = useContext(UserInfoConText);
  const sendMessage = (message) => {
    if (message) {
      socket.emit('sendNotice', { userName, message }, () => setMessage(''));
    }
  };
  return (
    <Layout>
      <Search
        placeholder="Sent a notification message to @All"
        enterButton="Sent"
        size="large"
        style={{ width: '70%', margin: '0 auto 10px auto' }}
        suffix={suffix}
        value={message}
        onChange={(value) => setMessage(value.value)}
        onSearch={sendMessage}
      />
    </Layout>
  );
});
