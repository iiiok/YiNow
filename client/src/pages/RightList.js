import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { Divider } from 'antd';
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
          <TabPane tab="WebSocket in a nutshell" key="1">
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
          <TabPane tab="Example from Socket.IO" key="7">
            <h3>Screen record from Socket.IO</h3>
            <video controls style={{ width: '100%', height: 'auto' }} autoPlay>
              <source src="/video/Socket_IO.mp4" type="video/mp4" />
            </video>
            <OpenALink url="https://socket.io/" title="Socket.io" />
          </TabPane>
          <TabPane tab="Example from Coinbase" key="8">
            <h3>Screen record from Coinbase.com</h3>
            <video controls style={{ width: '100%', height: 'auto' }} autoPlay>
              <source src="/video/coinbase.mp4" type="video/mp4" />
            </video>
            <OpenALink url="https://pro.coinbase.com/" title="Coinbase.com" />
          </TabPane>
          <TabPane tab="Front-End Code - ReactJs" key="3">
            <h3>Front-End Code - ReactJs</h3>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {FECodeString}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="Back-End Code" key="4">
            <p>Back-End Code -- Node.js</p>
          </TabPane>
          <TabPane tab="[FE] - ReactJs + MobX + AntD" key="5">
            <p>[FE] - ReactJs + MobX + AntD</p>
            <HorizontalBar data={data2} />
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
