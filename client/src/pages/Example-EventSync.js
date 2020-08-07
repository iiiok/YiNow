import React, { useState, useEffect, useRef, useContext } from 'react';
import { Carousel, Layout } from 'antd';
import { Card, Tabs } from 'antd';
import {
  LineChartOutlined,
  LaptopOutlined,
  AudioOutlined,
  LoadingOutlined,
  SmileOutlined,
  GlobalOutlined,
  TeamOutlined,
  AppleOutlined,
  AndroidOutlined,
  SendOutlined
} from '@ant-design/icons';
import { socket } from '../service/socket';
import HostScript from '../components/TextView/HostScript';
import { observer } from 'mobx-react';
import { options2, data2, data3, plugins, options } from '../service/dummyDate';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';
import UserStore from '../service/UserStore';
const { TabPane } = Tabs;

const { Content } = Layout;
const paragraph1 =
  "Here is a example of sharing your ppt sliders with the participants. The first page is the welcome page ...\
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
    <Card title={'Hi, Welcome to the meeting.'}>
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
        <p>
          <img src="/ppt/long-roads-of-new-zealand.jpg" alt="" />
        </p>

        <p className="flex-caption">Welcome Page</p>
      </div>
      <div>
        <p>
          <img src="/images/smartphone-to-tv.jpg" alt="" />
        </p>

        <p className="flex-caption">As a TV controller</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-3.jpg" alt="" />
        </p>

        <p className="flex-caption">As a TV controller</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-2.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-13.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-4.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-7.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-8.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <HorizontalBar data={data2} options={options2} />

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>
      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-10.jpg" alt="" />
        </p>

        <p className="flex-caption">EPAM SYSTEM 2020</p>
      </div>

      <div>
        <p>
          <img src="/images/7244-01-business-presentation-16x9-15.jpg" alt="" />
        </p>

        <p className="flex-caption">The End， Thank You!</p>
      </div>
    </Carousel>
  );
}

function YiTab({ slideIndex, selectTab }) {
  // const [ tabIndex, setTabIndex ] = useState(0);

  return (
    <Tabs onChange={(slideIndex) => selectTab(slideIndex)} activeKey={slideIndex}>
      <TabPane
        key="1"
        tab={
          <span>
            <AppleOutlined />
            Intro
          </span>
        }
      />
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            As a TV controller
          </span>
        }
        key="2"
      />
      <TabPane
        tab={
          <span>
            <GlobalOutlined />
            TV Sync
          </span>
        }
        key="3"
      />
      <TabPane
        tab={
          <span>
            <AudioOutlined />
            Interactive Concert
          </span>
        }
        key="4"
      />
      <TabPane
        tab={
          <span>
            <TeamOutlined />
            Sport Event Sync
          </span>
        }
        key="5"
      />
      <TabPane tab="Indiviual Skill" key="6">
        {' '}
      </TabPane>
      <TabPane
        tab={
          <span>
            <LaptopOutlined />
            Work Process
          </span>
        }
        key="7"
      >
        {' '}
      </TabPane>
      <TabPane tab="Time Line Plan" key="8">
        {' '}
      </TabPane>
      <TabPane
        tab={
          <span>
            <LineChartOutlined />
            Predition in 2021
          </span>
        }
        key="9"
      >
        {' '}
      </TabPane>
      <TabPane
        tab={
          <span>
            <SendOutlined />
            Current Progress
          </span>
        }
        key="10"
      >
        {' '}
      </TabPane>
      <TabPane
        tab={
          <span>
            <SmileOutlined />
            The End
          </span>
        }
        key="11"
      >
        {' '}
      </TabPane>
    </Tabs>
  );
}
