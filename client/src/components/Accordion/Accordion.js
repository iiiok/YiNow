import React, { useState, useEffect } from 'react';
import { Collapse, List, Divider, Card, Row, Col, PageHeader, Modal } from 'antd';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
import { data3, options, data4, data5 } from '../../service/dummyDate';
import PopImage from '../PopImage';
import HighLight from '../../components/TextView/HighLight';
const { Panel } = Collapse;
const bulletPoint = [ 25, 26, 27, 28, 29, 30, 31, 32 ];
const MyAccordion = () => {
  const [ accordionIndex, setAccordionIndex ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  useEffect(() => {
    socket.on('updateAccordionIndexEmit', (key) => {
      console.log('updateAccordionIndexEmit', key.accordionIndex);
      setAccordionIndex(key.accordionIndex);
    });
  }, []);

  const onAccordionChange = (key) => {
    setAccordionIndex(key);
    if (key) {
      socket.emit('updateAccordionIndex', key);
    }
  };

  return (
    <div className="accordion">
      <PageHeader className="site-page-header" title="Traditional Online Meeting Systems" subTitle="Pros and Cons" />

      <Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true} accordion>
        <Panel header="Traditional Online Meeting Systems" key="1">
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Webinars">
                  <p>
                    <strong>A webinar</strong> is an online meeting or presentation held via the Internet in real-time.
                    To put it simply, it is an <strong>online event</strong>, which connects individuals with viewers
                    across the world.
                  </p>
                  <a href="https://myownconference.com/blog/en/index.php/what-is-a-webinar/" target="wwnow">
                    What is a Webinar and How Does it Work?
                  </a>
                  <OpenALink url="https://myownconference.com/blog/en/index.php/what-is-a-webinar/" />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Zoom">
                  <img src="images/zoom.png" width="180px" />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Microsoft Teams">
                  <img src="images/team.jpg" />
                </Card>
              </Col>
            </Row>
          </div>

          <h2>What do they have in common:</h2>
          <ul>
            <li>Need specific software</li>
            <li>Audience need account to join</li>
            <li>Heavy Network Traffic</li>
          </ul>
        </Panel>
        <Panel header="Main Issues - network" key="2">
          <h2> Network Nightmare </h2>
          <ul>
            <li>Let's say, we have 2 people having a online meeting</li>
            <li>And supposed that the "Desktop Sharing Video" will consume 2M's network traffic every second</li>
            <li>Meanwhile it will consume 0.2M for audio meeting + 5M's web content for audio+web meeting</li>
          </ul>
          <Row>
            <Col span={2}> </Col>
            <Col span={20}>
              <Bar data={data3} options={options} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={4} />
            <Col>
              <h2>How about a meeting for 100 people</h2>
            </Col>
          </Row>
          <Divider />
          <Row gutter={60}>
            <Col span={20}>
              <Bar data={data4} options={options} />
            </Col>
          </Row>
          <Divider />
          <h2>For a meeting/seminar like this, audio-via-network is no longer needed </h2>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <PopImage picUrl="/images/lecture_laptop.jpg" title="Seminar 1" />
            </Col>
            <Col span={12}>
              <PopImage picUrl="/images/lecture_laptop2.jpg" title="Seminar 2" />
            </Col>
          </Row>
          <Divider />
          <h2>Here is the traffic comparison</h2>
          <Divider />
          <Bar data={data5} options={options} />
        </Panel>
        <Panel header="Other shortcommings" key="3">
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={bulletPoint}
            renderItem={(item) => (
              <List.Item>
                <HighLight scriptId={item} />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </div>
  );
};
export default MyAccordion;
