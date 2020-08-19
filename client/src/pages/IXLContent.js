import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Tabs, Icon, Button, Modal, Menu, Card } from 'antd';
import { socket } from '../service/socket';
import {
  LineChartOutlined,
  LaptopOutlined,
  ConsoleSqlOutlined,
  LoadingOutlined,
  SmileOutlined,
  GlobalOutlined,
  TeamOutlined,
  AppleOutlined,
  AndroidOutlined,
  SendOutlined
} from '@ant-design/icons';
const { TabPane } = Tabs;

export default class IXLContent extends React.Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: '100%'
    };
  }
  onClick = () => {
    console.log('onClick');
  };

  render() {
    return (
      <div>
        <YiTab />
        <iframe
          onClick={this.onClick}
          ref="iXLiFram"
          style={{ width: '100%', height: this.state.iFrameHeight, overflow: 'visible' }}
          onLoad={() => {
            const obj = ReactDOM.findDOMNode(this.refs.iXLiFram);
            console.log('findDOMNode', obj);
            this.setState({
              iFrameHeight: obj.contentWindow.document.body.scrollHeight + 'px'
            });
            // console.log('iframe', obj.contentWindow.document.body.scrollHeight);
          }}
          src="ixl.html"
          width="100%"
          height={this.state.iFrameHeight}
          scrolling="no"
          frameBorder="0"
        />
      </div>
    );
  }
}

function YiTab() {
  // const [ tabIndex, setTabIndex ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const onTabClick = (key) => {
    console.log('onTabClick', key);
    if (key == 1) {
      setShowModal(true);
      socket.emit('setShowModal', true);
    }
  };
  const handleOk = () => {
    setShowModal(false);
    socket.emit('setShowModal', false);
  };

  useEffect(() => {
    console.log('on(setShowModal)');
    socket.on('setShowModalEmit', (value) => {
      console.log('got a setShowModal Emit');
      setShowModal(value);
    });
  }, []);
  return (
    <div>
      <Modal title="W.2 Interpret food webs I" visible={showModal} onOk={handleOk} onCancel={handleOk} width="50%">
        <p>
          <img src="/images/eClass.png" width="95%" alt="Loading" />
        </p>
      </Modal>
      <Tabs onTabClick={onTabClick}>
        <TabPane
          key="1"
          tab={
            <span>
              <AppleOutlined />
              Click to Pop-up a Subject
            </span>
          }
        >
          {' '}
        </TabPane>
      </Tabs>
    </div>
  );
}
