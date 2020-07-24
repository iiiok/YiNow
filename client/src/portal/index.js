import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { Layout, Menu, Breadcrumb, Switch, Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import Ending from '../pages/Ending';
import YiChart from '../pages/YiChart';
import RightList from '../pages/RightList';
import MySteps from '../components/SliderShow/MySteps';
// import HostScript from '../components/TextView/HostScript';
// import { paragraph1 } from '../service/dummyDate';
import YoutubeVideo from '../components/SliderShow/YoutubeVideo.js';

import { socket } from '../service/socket';
import queryString from 'query-string';
import IXLContent from '../pages/IXLContent';
import RightList_next from '../pages/RightList_next';
import RightList_arch from '../pages/RightList_arch';
import My_Ifram from '../components/SliderShow/My_Ifram';
import VotingSample from '../pages/voting-sample';
import WebSocketAccordion from '../components/Accordion/Accordion_websocket';
import MyStatus from './status';
import YiFooter from './footer';
import Links from './links';
import ExamplePPT from '../pages/Example-PPT';
import Wellcome from '../pages/Wellcom';
import ExampleEventSync from '../pages/Example-EventSync';
import Resource from '../pages/Resource';
import Chat from '../components/Chat/Chat';
import { observer, useObservable, useLocalStore } from 'mobx-react';
// import { observer } from 'mobx-react-lite';
import { random } from 'lodash';
import UserStore from '../service/UserStore';
import { SmileOutlined } from '@ant-design/icons';
const justSayHi = (userName) => {
  console.log('sendNotice', userName);
  socket.emit('sendNotice', { userName: userName, message: 'Just say hi.' }, () => {});
};
const { Header, Content, Footer } = Layout;
const components = {
  1: Wellcome,
  2: Chat,
  6: YoutubeVideo,
  7: IXLContent,
  8: Ending,
  11: ExamplePPT,
  12: YiChart,
  13: ExampleEventSync,
  15: Resource,
  14: VotingSample,
  22: MySteps,
  31: RightList,
  32: RightList_arch,
  34: RightList_next,
  35: My_Ifram,
  36: WebSocketAccordion
};

const UserInfoConText = createContext();

export const Portal = observer(({ location }) => {
  const store = useContext(UserStore);
  const { userName } = queryString.parse(location.search);
  store.userName = userName;
  console.log('store.slideIndex', store.slideIndex);

  const [ slideIndex, setSlideIndex ] = useState(1);
  const [ BGImage, setBGImage ] = useState(0);
  const onMenuChange = (e) => {
    console.log('object', e.key);
    setSlideIndex(e.key);
    if (e.key) {
      socket.emit('updateSliderIndex', e.key, () => setSlideIndex(e.key));
    }
  };

  useEffect(
    () => {
      socket.on('updateSliderIndexEmit', (key) => {
        store.slideIndex = key.sliderIndex;
        console.log('updateSliderIndexEmit', key.sliderIndex, new Date().getTime());
        setSlideIndex(key.sliderIndex);
      });
      socket.off('changeBackgroundEmit').on('changeBackgroundEmit', (n) => {
        // store.slideIndex = key.sliderIndex; random(1, 8)
        setBGImage(n);
      });
    },
    [ slideIndex ]
  );

  useEffect(() => {
    socket.on('swithcMenuEmit', (val) => {
      console.log('swithcMenu ', val);
      store.isMenuOn = val;
    });
  }, []);
  const SpecificComponent = components[slideIndex];
  return (
    <UserInfoConText.Provider
      value={{
        username: userName
      }}
    >
      <Layout id="withBlackGround" className={'BGImage' + BGImage}>
        <Header className="header">
          <div className="header_left">
            <div id="logo">
              <img alt="logo" src="/images/Epam_Logo.png" />
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
              <Menu.Item key="1">Next Genaration of Meeting and Event</Menu.Item>
            </Menu>
          </div>
          <MyStatus
            style={{ width: '60%' }}
            asHost={store.asHost}
            userCount={store.userList.length}
            userName={userName}
            onSwitch={store.switchAsHost}
          />
        </Header>
        <Content className="main-content">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Next Genaration of Meeting</Breadcrumb.Item>
            <Breadcrumb.Item>OnAir</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            {(store.asHost || store.isMenuOn) && (
              <Links
                onMenuChange={onMenuChange}
                selectedKeys={[ slideIndex.toString() ]}
                userName={store.userName}
                swithcMenu={store.swithcMenu}
                asHost={store.asHost}
                isMenuOn={store.isMenuOn}
              />
            )}
            <Content className="main-content__left">
              {slideIndex && <SpecificComponent name={userName} />}
              <Tag icon={<SmileOutlined />} color="#55acee" onClick={() => justSayHi(userName)}>
                Say Hi
              </Tag>
            </Content>
          </Layout>
          <YiFooter userName={store.userName} />
        </Content>
        <Footer className="main_footer">WWNow.com - ©2020 Created by EPAM System, inc.</Footer>
      </Layout>
    </UserInfoConText.Provider>
  );
});
