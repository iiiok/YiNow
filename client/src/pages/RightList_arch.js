import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, List, Tabs, Card ,Divider} from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { observer, useObservable, useLocalStore } from 'mobx-react';
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
            <Divider orientation="left">
              <h4>Overall Architecture</h4>
            </Divider>
            <PopImage picUrl="/images/WebSocket_Arch.png" title="Overall Architecture" />
          </TabPane>
          <TabPane tab="[FE] - ReactJs + MobX + AntD" key="5">
          <Divider orientation="left">
              <h4>[FE] - ReactJs + MobX + AntD</h4>
            </Divider>
            <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers>
              {codeString}
            </SyntaxHighlighter>
          </TabPane>
 
          <TabPane tab="[FE] Deployment" key="7">
          <Divider orientation="left">
              <h4>Here is how I deployed Front-End App to [Netlify]</h4>
            </Divider>
            <img src="/images/netlify.PNG" width="100%" />
          </TabPane>
          <TabPane tab="[BE] Deployment" key="8">
          <Divider >
              <h4>Here is how I deployed Back-End API (NodeJs Function) to [Heroku]</h4>
            </Divider>
            
            <img src="/images/Heroku.PNG" width="100%" />
          </TabPane>

        </Tabs>
        <Divider />

      </Card>
    </div>
  );
});
