import React, { useState, useEffect } from 'react';
import { Row, Col, Icon, Button, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import { data, data2, data3, options } from '../service/dummyDate';
import { Divider } from 'antd';
import { observer } from 'mobx-react';
import PopImage from '../components/PopImage';
import HighLight from '../components/TextView/HighLight';

// import Voting from '../components/Voting/voting';
const { TabPane } = Tabs;
const bulletPoint = [ 9, 10, 11, 12, 13 ];
export default observer(() => {
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
                <ul className="yi-Ul">
                  <li>
                    <HighLight
                      scriptId={99}
                      header={
                        'Teachers may use such a system to distrubute courseware to all the students druing the class '
                      }
                    />
                  </li>
                  <li>
                    <HighLight
                      scriptId={99}
                      header={'All students are at the "same page" and their feedback will be collected instantlly. '}
                    />
                  </li>
                  <li>
                    <HighLight
                      scriptId={99}
                      header={
                        'Some specified APPs havd already had this feature. But a Web-App will be much more accessable '
                      }
                    />
                  </li>
                </ul>
              </li>
            </ul>
            <h3 />
            <img src="/images/eClass.png" heigh="393" width="491" alt="Loading" className="centered_image" />
          </TabPane>
          <TabPane tab="Online PPT => HTML/JPG functions" key="2">
            <h2>Online PPT => HTML/JPG functions</h2>
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
          <TabPane tab="Customized Presentation Portal" key="3">
            <PopImage
              picUrl="/ppt/wix.jpg"
              title="Web-base content composer, provide lots of template likes Wix.com, WordPress.org, for the user to generate their own App easily"
            />
          </TabPane>
          <TabPane tab="A Universal Event App" key="5">
            <h2>A universal Event App</h2>
            <PopImage picUrl="/images/people-communication.jpg" title="Event base Universal App" />
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
