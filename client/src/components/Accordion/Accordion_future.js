import React, { useState, useEffect } from 'react';
import { Collapse, Button, Divider, Card, Row, Col, PageHeader, Modal } from 'antd';
import { socket } from '../../service/socket';
import HighLight from '../../components/TextView/HighLight';
import SayHi from '../SayHi/sayhi';
import List from '../List';
const { Panel } = Collapse;
const list1 = [
  {
    id: 1,
    value: 'With this full-duplex communication protocol, we can do a a lot more than just a meeting-sidekick system'
  },
  { id: 2, value: 'With React Hooks inside, every "client" app may act as a server, vise versa' },
  { id: 3, value: 'Web-base means @everyone is ready to participate, new applications could be introduced. ' }
];

const PPTFuture = () => {
  const [ accordionIndex, setAccordionIndex ] = useState([]);
  useEffect(() => {
    socket.on('updateAccordionIndexEmit', (key) => {
      console.log('updateAccordionIndexEmit', key.accordionIndex);
      setAccordionIndex(key.accordionIndex);
    });
    return () => socket.off('updateAccordionIndexEmit');
  }, []);

  const onAccordionChange = (key) => {
    setAccordionIndex(key);
    if (key) {
      socket.emit('updateAccordionIndex', key);
    }
  };
  return (
    <div className="accordion">
      <PageHeader className="site-page-header" title="This system can do lots more then sharing PPT " />

      <Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true} accordion>
        <Panel header="Support all kind of Web-base Media, Resource and widget" key="1">
          <ul className="yi-Ul">
            <li>
              <HighLight scriptId={33} header={'Share the Original Resource'} />
            </li>
            <li />
            <li>
              <HighLight scriptId={35} header={'Lasting Effect'} />
            </li>
          </ul>
        </Panel>
        <Panel header="Interaction & Participation" key="5">
          {/* <HighLight scriptId={35} header={'Involvement'} /> */}
          <h2>Support all kinds of web-base interactions</h2>
          <HighLight scriptId={99} header={'Voting, Bidding, Games, Pop-up message'} />
          <br />
          <HighLight scriptId={99} header={'Answer Sheet, Chat Room, Message Board'} />
          <br />
          <HighLight scriptId={99} header={'Give instant feedback, Like, Change background, etc.'} />
          {/* <HighLight scriptId={2} header={'Interaction'} /> */}
          <Card>
            <SayHi />
          </Card>
        </Panel>
        <Panel header="More Than Just a Meeting-assistant System" key="2">
          <List listArry={list1} listId={'l13'} />

          <ul className="yi-Ul">
            <li>
              <HighLight scriptId={18} header={'Two-ways interaction '} />
            </li>
            <li>
              <HighLight scriptId={17} header={'Client dominate'} />
            </li>
            <li>
              <HighLight scriptId={16} header={'Synchronous Web Broadcast [1 - million] '} />
            </li>
          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};
export default PPTFuture;
