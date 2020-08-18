import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { Divider } from 'antd';
import YiList from '../components/List';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import OpenALink from '../components/OpenALink';
import HighLight from '../components/TextView/HighLight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { TabPane } = Tabs;
const FECodeString = `import React, { useState, useEffect } from 'react';
import { socket } from '../service/socket';
export default observer(() => {
  const [ tabIndex, setTabIndex ] = useState('1');
  const selectTab = (index) => {
    socket.emit('syncShowingTab', index);
    setTabIndex(index);
  };

  useEffect(() => {
    socket.on('syncShowingTabEmit', (key) => {
      setTabIndex(key);
    });
  }, []);
  return (

    <Tabs onChange={(TabIndex) => selectTab(TabIndex)} activeKey={tabIndex}>
    </Tbas>

    )
  });

`;
const BECodeString = `const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
/** Init the Http Server **/

const socketio = require('socket.io');
const io = socketio(server);

io.on('connect', (socket) => {

  socket.on('syncShowingTab', (key) => {
    socket.broadcast.emit('syncShowingTabEmit', key);
  });

});

/**Run the NodeJs server */
server.listen(process.env.PORT || 5000, () => console.log('Server has started.'));
`;

const BECodeString2 = `setInterval(() => {
  socket.broadcast.emit('updateSliderIndexEmit', { sliderIndex: sliderIndex });
}, 4000);
`

const WSCodeString = `0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+---------------------------------------------------------------+
`;
const list6 = [
  {
    id: 1,
    value: 'Websockets have four states: [connecting, open, closing and closed].'
  },
  { id: 2, value: 'All communication between clients and servers takes place though the use of the websocket frame.' },
  {
    id: 3,
    value: 'A frame is a small header + “payload”. '
  }
];
const bulletPoint = [ 9, 10, 11, 12, 13 ];
export default observer(({ userName }) => {
  const [ tabIndex, setTabIndex ] = useState('1');
  const selectTab = (index) => {
    console.log('syncShowingTab', index);
    socket.emit('syncShowingTab', index);
    setTabIndex(index);
  };

  useEffect(() => {
    socket.on('syncShowingTabEmit', (key) => {
      console.log('syncShowingTabEmit', key);
      setTabIndex(key);
    });
  }, []);
  return (
    <div className="row">
      <Card title={'Real-time full-duplex communication WebSocket: How does it work?'}>
        <Tabs tabPosition="right" onChange={(TabIndex) => selectTab(TabIndex)} activeKey={tabIndex}>
          <TabPane tab="Example from Socket.IO" key="1">
            <Divider orientation="left">
              <h3>Screen record from Socket.IO</h3>
            </Divider>
            <video controls style={{ width: '100%', height: 'auto' }} autoPlay>
              <source src="/video/Socket_IO.mp4" type="video/mp4" />
            </video>
            <OpenALink url="https://socket.io/" title="Socket.io" />
          </TabPane>
          <TabPane tab="Example from Coinbase" key="2">
            <Divider orientation="left">
              <h3>Screen record from Coinbase.com</h3>
            </Divider>
            <video controls style={{ width: '100%', height: 'auto' }} autoPlay>
              <source src="/video/coinbase.mp4" type="video/mp4" />
            </video>
            <OpenALink url="https://pro.coinbase.com/" title="Coinbase.com" />
          </TabPane>
          <TabPane tab="WebSocket Structure" key="3">
            <Divider orientation="left">
              <h4>Websocket connection lifespan and frame structure</h4>
            </Divider>
            <YiList listArry={list6} listId={'l21'} />
            <p> A frame looks like this:</p>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {WSCodeString}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="Front-End Code - ReactJs" key="4">
            <Divider orientation="left">
              <h3>Front-End Code - ReactJs</h3>
            </Divider>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {FECodeString}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="[FE] - ReactJs + MobX + AntD" key="5">
            <Divider orientation="left">
              <h3>[FE] - ReactJs + MobX + AntD</h3>
            </Divider>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {FECodeString}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="Back-End Code" key="6">
            <Divider orientation="left">
              <h3>Back-End Code -- Node.js</h3>
            </Divider>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {BECodeString}
            </SyntaxHighlighter>
            <Divider orientation="left">
              <h3>Make sure every one is at the same page</h3>
            </Divider>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {BECodeString2}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="WebSocket in a nutshell" key="7">
            <Divider orientation="left">
              <h3>WebSocket in a nutshell</h3>
            </Divider>
            <HighLight scriptId={21} />
            <HighLight scriptId={22} />
            <HighLight scriptId={23} />
            <Divider orientation="left">
              <h3>Steps of communication</h3>
            </Divider>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={bulletPoint}
              renderItem={(item) => (
                <List.Item>
                  <HighLight scriptId={item} />
                </List.Item>
              )}
            />
          </TabPane>
          {/* <TabPane tab="The Conclusion" key="9">
            <h2>That is all, Thanks</h2>
            <img src="/images/1600w-wl2DiGq9Lj4.jpg" width="100%" />
          </TabPane> */}
        </Tabs>
        <Divider />

        <Row>
          <Col lg={{ span: 3, offset: 1 }} />
        </Row>
      </Card>
    </div>
  );
});
