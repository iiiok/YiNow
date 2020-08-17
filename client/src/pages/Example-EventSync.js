import React, { useState, useEffect, useRef, useContext } from 'react';
import { Carousel, Layout, Row, Col, Divider } from 'antd';
import { Card, Tabs } from 'antd';
// import {
//   LineChartOutlined, LaptopOutlined, AudioOutlined, LoadingOutlined, FundProjectionScreenOutlined, CarOutlined, GlobalOutlined,
//   TeamOutlined, DribbbleOutlined, ShoppingCartOutlined, RedditOutlined, AppleOutlined, AndroidOutlined, SendOutlined
// } from '@ant-design/icons';
import { socket } from '../service/socket';
import HostScript from '../components/TextView/HostScript';
import { observer } from 'mobx-react';
import PopImage from '../components/PopImage';
import UserStore from '../service/UserStore';
import List from '../components/List';
const list1 = [
  {
    id: 1,
    value: 'Replacement for blackboards, text-books, sliders'
  },
  { id: 2, value: 'Two-Ways Intraction' },
  { id: 3, value: 'High involvement, keep track of every student' }
];
const list2 = [
  {
    id: 1,
    value: 'TV'
  },
  { id: 2, value: 'The WebApp keep broadcasting related information synchronized with what’s on the TV channel.' },
  {
    id: 3,
    value:
      'Whenever there is an advertisements, the audiences can learn more about it on his/her phone and purchase it in one click. '
  }
];
const { TabPane } = Tabs;

const { Content } = Layout;
const paragraph1 =
  "Here is a Typical example of sharing PPT sliders with the participants. The first page is the aboutus page , business plan...\
What is special about this PPT functionalities? 1. The presentr'll be about to navigate the pages easily. \
2. 0 pixal transfer lost, the attendees have a clear view as the  presenter. \
3.The audience may navigate the content when there is a need. 4.The host may write some speech here but not showing to the audience...";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  effect: 'fade',
  adaptiveHeight: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '0px',
  slidesToScroll: 1,
  swipeToSlide: true
};

export default observer(({}) => {
  const store = useContext(UserStore);
  const sliderId = 'ab1';
  const [ slideIndex, setSlideIndex ] = useState(1);
  const selectTab = (index) => {
    console.log('syncSlider', index);
    socket.emit('syncSlider', { sliderId, index });
    setSlideIndex(index);
  };

  useEffect(
    () => {
      socket.off('syncSliderEmit-ab1').on('syncSliderEmit-ab1', (key) => {
        console.log('syncSliderEmit-ab1', key.index);
        setSlideIndex(key.index);
      });
    },
    [ slideIndex ]
  );

  return (
    <Card title={'Some Business Scenarios Inspired by WebSocket'}>
      <YiTab slideIndex={slideIndex} selectTab={selectTab} />
      <Content style={{ padding: '0 0' }}>
        <Slider slideIndex={slideIndex} />
      </Content>
      <HostScript script={paragraph1} asHost={store.asHost} />
    </Card>
  );
});

function Slider({ slideIndex }) {
  // const store = useContext(UserStore);
  const slider_ab1 = useRef();
  console.log('slideIndex-ab1', slideIndex);

  useEffect(
    () => {
      slider_ab1.current.slick.slickGoTo(slideIndex - 1);
      console.log('slideIndex-slick', slideIndex);
    },
    [ slideIndex ]
  );

  return (
    <Carousel ref={slider_ab1} {...settings} className="ppt">
      <div>
        <Divider>
          <h3>A full-duplex Web App to share information and enable massive interaction with low cost.</h3>
        </Divider>
        <p>
          <img src="/ppt/BusinessScenarios.jpg" alt="" />
        </p>
      </div>
      <div>
        <Divider>
          <h3>Conference content sharing</h3>
        </Divider>
        <PopImage picUrl="/images/business-teamwork.jpg" title="" />
      </div>
      <div>
        <Divider>
          <h3>Educational assistant</h3>
        </Divider>
        <List listArry={list1} listId={'l19'} />
        <Row gutter={16}>
          <Col span={12}>
            <PopImage picUrl="/images/school-lesson_01.jpg" title="" />
          </Col>
          <Col span={12}>
            <PopImage picUrl="/images/school-lesson_02.jpg" title="" />
          </Col>
        </Row>
      </div>

      <div>
        <Divider>
          <h3>As a TV Remote Controller</h3>
        </Divider>
        <p>
          <img src="/images/smartphone-to-tv.jpg" alt="" />
        </p>
      </div>
      <div>
        <Divider>
          <h3>Use Smartphone as the Car Stereo's Control Panel</h3>
        </Divider>
        <p>
          <img src="/images/smartphone-to-stereo.jpg" alt="" />
        </p>
      </div>
      <div>
        <Divider>
          <h3>Shopping Mall Guiding System</h3>
        </Divider>
        <PopImage
          picUrl="/images/mall-screen-1.jpg"
          title="What if you can control this Screen using your own Phone?"
        />
        <Divider>
          <h3>The best touch screen is on your hand</h3>
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <PopImage
              picUrl="/images/shoppingmall_01.gif"
              title="The best user input interface is also on your phone"
            />
          </Col>
          <Col span={12}>
            <PopImage
              picUrl="/images/shoppingmall_03.gif"
              title="The most valuable thing is that these information are now cloned to the client's devices(link to the order system)"
            />
          </Col>
        </Row>
        <Divider>
          <h3>Mulit-player virtual reality game</h3>
        </Divider>
        <PopImage
          picUrl="/images/shoppingmall.jpg"
          title="It could support lots of people to participate (security issues? Every participant just the proxy of this app)"
        />
      </div>
      <div>
        <Divider>
          <h3>TV channel synchronous broadcast</h3>
        </Divider>
        <List listArry={list2} listId={'l29'} />

        <Row gutter={16}>
          <Col span={12}>
            <PopImage picUrl="/images/TVChannel.jpg" title="" />
          </Col>
          <Col span={12}>
            <PopImage picUrl="/images/TVChannel.jpg" title="" />
          </Col>
        </Row>
      </div>
      <div>
        <Divider>
          <h3>Sport event synchronous broadcast</h3>
        </Divider>

        <PopImage picUrl="/images/football-stadium.jpg" title="" />
      </div>
    </Carousel>
  );
}

function YiTab({ slideIndex, selectTab }) {
  // const [ tabIndex, setTabIndex ] = useState(0);

  return (
    <Tabs onChange={(slideIndex) => selectTab(slideIndex)} activeKey={slideIndex}>
      <TabPane tab={<span> Home </span>} key="1" />
      <TabPane tab={<span>Conference</span>} key="2" />
      <TabPane tab={<span>Educational assistant</span>} key="3" />
      <TabPane tab={<span>TV controller</span>} key="4" />
      <TabPane tab={<span>Car Stereo Controller</span>} key="5" />
      <TabPane tab={<span>Shopping Mall Guiding System</span>} key="6" />
      <TabPane tab={<span>TV synchronous broadcast</span>} key="7" />
      <TabPane tab={<span>Sport Event Sync</span>} key="8" />
    </Tabs>
  );
}
