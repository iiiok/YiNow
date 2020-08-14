import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import OpenALink from '../components/OpenALink';
import HighLight from '../components/TextView/HighLight';
import PopImage from '../components/PopImage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import Voting from '../components/Voting/voting';
const { TabPane } = Tabs;
const codeString = `const [ tabIndex, setTabIndex ] = useState('1');
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
}, []);`;
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
      <Card title={'What is Next'}>
        <Tabs tabPosition="right" onChange={(TabIndex) => selectTab(TabIndex)} activeKey={tabIndex}>
          {/* <TabPane tab="Real-time " key="2">
            <h3>What's WebSocket?</h3>
            <HighLight scriptId={22} />
            <HighLight scriptId={23} />
          </TabPane> */}

          <TabPane tab="Overall" key="1">
            <h2>Overall Architecture </h2>
            <PopImage picUrl="/images/WebSocket_Arch.png" title="Overall Architecture" />
          </TabPane>
          <TabPane tab="[FE] - ReactJs + MobX + AntD" key="5">
            <p>[FE] - ReactJs + MobX + AntD</p>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {codeString}
            </SyntaxHighlighter>
          </TabPane>
          <TabPane tab="Predition" key="6">
            <h2>Mixed data Example</h2>
            <Bar data={data3} options={options} />
          </TabPane>
          {/*<TabPane tab="Example from Socket.IO" key="7">
						<h3>Socket.IO</h3>
						<Divider />
						<video controls style={{ width: '100%', height: 'auto' }}>
							<source src="/video/Socket_IO.mp4" type="video/mp4" />
						</video>
						<OpenALink url="https://socket.io/" title="socket.io" />
					</TabPane>
					 <TabPane tab="Example from Coinbase" key="8">
						<h3>Socket.IO</h3>
						<Divider />

						<video controls style={{ width: '100%', height: 'auto' }}>
							<source src="/video/coinbase.mp4" type="video/mp4" />
						</video>

						<OpenALink url="https://pro.coinbase.com/" title="Coinbase" />
					</TabPane> */}
          <TabPane tab="[FE] Deployment" key="7">
            <h2>Here is how I deployed Front-End App to Netlify </h2>
            <img src="/images/netlify.PNG" width="100%" />
          </TabPane>
          <TabPane tab="[BE] Deployment" key="8">
            <h2>Here is how I deployed Back-End API to Heroku </h2>
            <img src="/images/Heroku.PNG" width="100%" />
          </TabPane>
          <TabPane tab="The Conclusion" key="9">
            <h2>That is all, Thanks</h2>
            <img src="/images/1600w-wl2DiGq9Lj4.jpg" width="100%" />
          </TabPane>
        </Tabs>
        <Divider />

        <Row>
          <Col lg={{ span: 3, offset: 1 }} />
        </Row>
      </Card>
    </div>
  );
});
