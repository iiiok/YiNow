import React, { useState, useEffect } from 'react';
import { Collapse, List, Divider, Card, Row, Col, PageHeader } from 'antd';
import { Bar } from 'react-chartjs-2';
import OpenALink from '../OpenALink';
import { socket } from '../../service/socket';
import { data3, options, data4, data5 } from '../../service/dummyDate';
import PopImage from '../PopImage';
import HighLight from '../../components/TextView/HighLight';
const { Panel } = Collapse;
const bulletPoint = [ 25, 26, 27, 28, 29, 30, 31, 32 ];
const MyAccordion = () => {
  const [ accordionIndex, setAccordionIndex ] = useState([]);
  const [ _data3, set_data3 ] = useState(data3);
  const [ _data4, set_data4 ] = useState(data4);
  const [ _data5, set_data5 ] = useState(data5);
  useEffect(() => {
    socket.on('updateAccordionIndexEmit', (key) => {
      console.log('updateAccordionIndexEmit', key.accordionIndex);
      setAccordionIndex(key.accordionIndex);
    });
  }, []);
  useEffect(() => {
    socket.on('dataShowntoggleEmit', (key) => {
      dataShowntogglt(key);
    });
  }, []);

  const onAccordionChange = (key) => {
    setAccordionIndex(key);
    if (key) {
      socket.emit('updateAccordionIndex', key);
    }
  };
  const onDataShowAll = (n) => {
    dataShowntogglt(n);
    socket.emit('dataShowntoggle', n);
  };
  const dataShowntogglt = (n) => {
    console.log('dataShowntoggleEmit', n);
    let v;
    switch (n) {
      case 3:
        v = { ...data3 };
        data3.datasets[1].hidden = !data3.datasets[1].hidden;
        set_data3(v);
        break;
      case 4:
        v = { ...data4 };
        data4.datasets[1].hidden = !data4.datasets[1].hidden;
        set_data4(v);
        break;
      case 5:
        v = { ...data5 };
        data5.datasets[1].hidden = !data5.datasets[1].hidden;
        set_data5(v);
        break;
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
                  <img src="images/webinar.png" width="180px" />
                  <hr />
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
            <li>
              And supposed that the "Desktop Sharing" Video + Audio broadcast will consume 2M's network traffic / second
            </li>
            <li>Meanwhile, for audio+web meeting, it will consume 0.2M for audio meeting + (5M)'s web content </li>
          </ul>
          <Row>
            <Col span={2}> </Col>
            <Col span={20}>
              <Bar data={_data3} options={options} onElementsClick={() => onDataShowAll(3)} />
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
              <Bar data={_data4} options={options} onElementsClick={() => onDataShowAll(4)} />
            </Col>
          </Row>
          <Divider />
          <h2>For a meeting/seminar like this, audio-via-network is no longer needed </h2>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <PopImage picUrl="/images/lecture_laptop.jpg" title="On-site Seminar 1" />
            </Col>
            <Col span={12}>
              <PopImage picUrl="/images/lecture_laptop2.jpg" title="On-site Seminar 2" />
            </Col>
          </Row>
          <Divider />
          <h2>Here is the traffic comparison</h2>
          <Divider />
          <Bar data={_data5} options={options} onElementsClick={() => onDataShowAll(5)} />
        </Panel>
        <Panel header="List of shortcommings" key="3">
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
