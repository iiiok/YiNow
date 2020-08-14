import React, { useState, useEffect } from 'react';
import { Collapse, PageHeader } from 'antd';
import PopImage from '../PopImage';
import { socket } from '../../service/socket';
import YouTubeVideo from '../YouTubeVideo';
import List from '../List';
const { Panel } = Collapse;
const list1 = [
  {
    id: 1,
    value: 'A client requests a webpage from a server.-(Ask for it)'
  },
  { id: 2, value: 'The server calculates the response.-(Get it)' },
  { id: 3, value: 'The server sends the response to the client. -(Send it back)' }
];
const list2 = [
  {
    id: 1,
    value: 'A client requests a regular HTTP.'
  },
  { id: 2, value: 'The client requests from the server at regular intervals (e.g. 0.5 seconds).-(Keep asking)' },
  { id: 3, value: 'The server calculates each response and sends it back, just like normal HTTP traffic.' }
];
const list5 = [
  {
    id: 1,
    value: 'A client requests a regular HTTP.'
  },
  { id: 2, value: 'The client requests from the server which opens a (WebSocket) connection to the server.' },
  {
    id: 3,
    value: 'The server and the client can now send each other messages when new data (on either side) is available.'
  }
];

const ReaTimeCommunication = () => {
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
        title="History of Real-time Full-duplex Communication for Web"
        subTitle="TCP Protocals"
      />

      <Collapse onChange={onAccordionChange} activeKey={accordionIndex} destroyInactivePanel={true} accordion>
        <Panel header="Regular HTTP" key="1">
          <List listArry={list1} listId={'l16'} />

          <PopImage picUrl="/images/Normal_HTTP_Request.png" title="Regular HTTP" />
        </Panel>
        <Panel header="Ajax Polling" key="2">
          <List listArry={list2} listId={'l17'} />

          <PopImage picUrl="/images/Ajax_Request.png" title="Ajax Polling" />
        </Panel>
        <Panel header="Ajax Long-Polling" key="3">
          <ul>
            <li>A client requests a regular HTTP.</li>
            <li>The client requests from the server</li>
            <li>The server does not immediately respond, but waits...</li>
            <li>When there's new information available, the server responds. </li>
            <li>
              The client receives the new information and immediately sends another request to the server, re-starting
              the process.
            </li>
          </ul>

          <PopImage picUrl="/images/Ajax_Request_long.png" title="Ajax Long-Polling" />
        </Panel>
        <Panel header="HTML5 Server Sent Events (SSE)" key="4">
          <ul>
            <li>A client requests a regular HTTP.</li>
            <li>The client requests from the server which opens a connection to the server.</li>
            <li>
              <p>The server sends an event to the client when there's new information available. </p>

              <ul>
                <li>Real-time traffic from server to client, mostly that's what you'll need</li>
                <li>You'll want to use a server that has an event loop</li>
                <li>Connections with servers from other domains are only possible with correct CORS settings</li>
              </ul>
            </li>
          </ul>

          <PopImage picUrl="/images/sse.png" title="HTML5 Server Sent Events (SSE)" />
        </Panel>
        <Panel header="HTML5 Websockets" key="5">
          <List listArry={list5} listId={'l18'} />
          <ul>
            <li>
              <ul>
                <li>Real-time traffic from the server to the client and from the client to the server</li>
                <li>You'll want to use a server that has an event loop</li>
                <li>
                  It is also possible to use a third party hosted websocket server, for example Pusher or others. This
                  way you'll only have to implement the client side.
                </li>
              </ul>
            </li>
          </ul>

          <PopImage picUrl="/images/webSocket.png" title="HTML5 Websockets" />
        </Panel>
        <Panel header="Conclusive Video" key="6">
          {/* <YouTube containerClassName={'youtubeContainer'} videoId={'sUEq35F-ELY'} /> */}
          <YouTubeVideo ytId="sUEq35F-ELY" start="233" volumn="100" />
        </Panel>
      </Collapse>
    </div>
  );
};
export default ReaTimeCommunication;
