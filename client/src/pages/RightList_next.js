import React, { useState, useEffect } from 'react';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import { Row, Col, Icon, Button, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import OpenALink from '../components/OpenALink';
import HighLight from '../components/TextView/HighLight';
// import Voting from '../components/Voting/voting';
const { TabPane } = Tabs;
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
      <Card title={'Customization & Commercialization '}>
        <Tabs tabPosition="right" onChange={(TabIndex) => selectTab(TabIndex)} activeKey={tabIndex}>
          <TabPane tab="Broadcast Enhachment" key="1">
            <h2>Enhance traditional Web-Apps with real-time functionality </h2>
            <ul>
              <li>
                <h3>An interactive education assistant App</h3>
                <p>
                  Teachers may use such a system to distrubute courseware to all the students druing the class, and all
                  students are at the "same page" and their feedback will be collected instantlly. You may say, some
                  specified APPs havd already had this feature. But a Web-App will be much more accessable.
                </p>
              </li>
            </ul>
            <h3 />
            <img src="/images/eClass.png" heigh="393" width="491" alt="Loading" className="centered_image" />
          </TabPane>
          <TabPane tab="Customized Presentation Portal" key="2">
            <h2>Customization</h2>
            <video
              muted=""
              preload="auto"
              poster="//www.zohowebstatic.com/sites/default/files/show/consistency.jpg"
              width="100%"
              autoPlay
              loop="loop"
              playsInline
              id="zs_import_video"
            >
              <source type="video/mp4" src="//www.zohowebstatic.com/sites/default/files/show/consistency.mp4" />
            </video>
          </TabPane>
          <TabPane tab="How does WebSocket work?" key="3">
            <p>Our plan</p>
            <HighLight scriptId={1} />
            <HighLight scriptId={2} />
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
          <TabPane tab="A Universal Event App" key="5">
            <h2>A universal Event App</h2>
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
