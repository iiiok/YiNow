import React, { useState, useEffect } from 'react';
import { Collapse, PageHeader, Divider } from 'antd';
import { socket } from '../../service/socket';

import PopImage from '../PopImage';
import List from '../List';
import HighLight from '../TextView/HighLight';
const { Panel } = Collapse;
const list1 = [
  { id: 1, value: 'Skype, Zoom, MS Teams, you may need a extra 1 to support the next meeting' },
  { id: 2, value: 'Accessibility - Everyone is Web-App ready(whoever gota smart phone)' },
  { id: 3, value: 'Anonymous participant - to support mass broadcast (e.g., TV sync broadcast) ' }
];

const WhyWebSocket = () => {
  const [ accordionIndex, setAccordionIndex ] = useState([]);
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
      <PageHeader
        className="site-page-header"
        title="How could WebSocket improve our PPT-base meeting?"
        subTitle="Pros and Cons"
      />

      <Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true} accordion>
        <Panel header="Much Less Network Burden" key="1">
          <div className="site-card-wrapper">
            <h4>
              Dramatic reduction in unnecessary network traffic that is obtained for the polling solution with 1,000,
              10,000, and 100,000 concurrently connected clients and compares it to what that would look like with
              WebSocket instead.
            </h4>
            <div style={{ width: '70%', marginLeft: '10%' }}>
              <PopImage
                picUrl="/images/dramatic_reduction.png"
                title="Dramatic reduction in unnecessary network traffic"
              />
            </div>
            <h4>
              WebSocket can provide a 500:1 or—depending on the size of the HTTP headers—even a 1000:1 reduction in
              unnecessary HTTP header traffic and a 3:1 reduction in latency.
            </h4>
          </div>
        </Panel>
        <Panel header="No Need for Additional Software" key="2">
          <h2>With WebScoket, Web-App is catching up with C/S software in Real-time communication. </h2>
          <List listArry={list1} listId={'l12'} />
        </Panel>
        <Panel header="Easy to Scacl Up" key="3">
          <HighLight scriptId={4} />
        </Panel>
        <Panel header="Present the content in the best Clarity" key="4">
          <h2> One big screen for all? </h2>
          <img src="/images/big_screen.jpg" title="Even bigger screen?" />

          <h2>Or, lots of small screens on hand!</h2>
          <img src="/images/screen-time-iOS-12-02.jpg" title="Small but with best clarity" />
        </Panel>
      </Collapse>
    </div>
  );
};
export default WhyWebSocket;
