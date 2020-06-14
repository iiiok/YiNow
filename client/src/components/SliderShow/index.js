import React, { useState, useEffect, useRef, useCallback } from "react";
import { Carousel, Layout, Menu, Breadcrumb,Switch } from "antd";
import { Result, Button, Divider, Collapse , Card } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import io from "socket.io-client";
import Ending from "./Ending";
import MySteps from "./MySteps";
import YoutubeVideo from "./YoutubeVideo.js";
import SayHi from "../SayHi/sayhi";
import { socket } from "../../service/socket";
import { debounce } from "lodash";
import queryString from "query-string";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const { Panel } = Collapse;

const sentScrollUpdate = (position) => {
  socket.emit("syncScrollPosition", position);
};
const scrollUpdate = debounce(sentScrollUpdate, 100);

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  adaptiveHeight: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: "0px",
  slidesToScroll: 1,
  swipeToSlide: true,
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
let positionY = 0;

console.log("waht");

function SliderParent({ location }) {
  const { userName, isHost } = queryString.parse(location.search);
  const [asHost, setHost] = useState(false);

  useEffect(() => {
    setHost(isHost === "true");
  }, [isHost]);

  const [slideIndex, setSlideIndex] = useState(1);
  const onSliderClick = (e) => {
    console.log("object", e.key);
    setSlideIndex(e.key);
    if (e.key) {
      socket.emit("updateSliderIndex", e.key, () => setSlideIndex(e.key));
      // console.log('send out updateSliderIndexEmit', new Date().getTime());
    }
  };
  useEffect(() => {
    socket.on("updateSliderIndexEmit", (key) => {
      console.log(
        "updateSliderIndexEmit",
        key.sliderIndex,
        new Date().getTime()
      );
      setSlideIndex(key.sliderIndex);
    });
  }, [slideIndex]);

  const [scrollPosition, setSrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    // console.log('scrollPosition', scrollPosition); //這里讀不了

    // console.log('syncScrollPosition', syncScrollPosition);
    if (Math.abs(positionY - position) > 50) {
      scrollUpdate(position, () => {});
      // scrollUpdate(position, (value)=> setSrollPosition(value));
      console.log("positionY - position", positionY, position);
      positionY = position;
      // setSrollPosition(98);
      // console.log('scrollPosition-in', scrollPosition);
    }
  }, []);
  // const handleScroll = () => {
  // 	const position = window.pageYOffset;
  // 	// setSrollPosition(position);
  // 	console.log('scrollPosition', scrollPosition);
  // 	// console.log('syncScrollPosition', syncScrollPosition);
  // 	if (Math.abs(scrollPosition - position) > 50) {
  // 		scrollUpdate(position);
  // 		console.log('scrollPosition - position', scrollPosition, position);
  // 		setSrollPosition(position);
  // 		console.log('scrollPosition-in', scrollPosition);
  // 	}
  // };
  useEffect(() => {
    socket.off("syncScrollPositionEmit").on("syncScrollPositionEmit", (key) => {
      console.log("syncScrollPositionEmit", key.newPosition);
      setSrollPosition(key.newPosition);
    });
  }, []);
  useEffect(() => {
    console.log("scroll to Position", scrollPosition);
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);
  useEffect(() => {
	  if (asHost) {

		  window.addEventListener("scroll", handleScroll, { passive: true });
	  }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [asHost]);

  const showUserName = "Hi， " + userName;
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
          <Card size="small" title={showUserName} >
      <p>You are: <Switch checkedChildren="Host" unCheckedChildren="觀眾" checked={asHost} onChange={()=>setHost(!asHost)} /></p>
    </Card>
  
          

            <Links onSliderClick={onSliderClick} selectedKeys={[slideIndex.toString()]}/>
			
            {/* scrollPosition: {scrollPosition} */}
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Slider slideIndex={slideIndex} />
            <Divider />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <img src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png" />
        <br /> WwNow.com ©2020 Created by EPAM group.
      </Footer>
    </Layout>
  );
}

function Links({ onSliderClick,selectedKeys}) {
	console.log('selectedKeys', selectedKeys)
	const [currentMenu, setCurrentMent] = useState(selectedKeys);
	useEffect(() => {
		setCurrentMent(selectedKeys);

	}, [selectedKeys])
	console.log(currentMenu);
  return (
    <Menu
      mode="inline"
      onSelect={onSliderClick} 
	//   defaultOpenKeys={currentMenu}
	//   defaultSelectedKeys={currentMenu}
	selectedKeys={currentMenu}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
    >
      <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" >
        <Menu.Item key="1">selectedKeys={currentMenu}</Menu.Item>
        <Menu.Item key="2">option2</Menu.Item>
        <Menu.Item key="3">option3</Menu.Item>
        <Menu.Item key="4">option4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
        <Menu.Item key="5">option5</Menu.Item>
        <Menu.Item key="6">option6</Menu.Item>
        <Menu.Item key="7">option7</Menu.Item>
        <Menu.Item key="8">option8</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

function Slider({ slideIndex }) {
  const sliderX = useRef();
  const [accordionIndex, setAccordionIndex] = useState(["1"]);
  const [drawerVisable, setDrawerVisable] = useState(false);

  useEffect(() => {
    socket.on("openDrawerEmit", (type) => {
      console.log("openDrawerEmit outside", type);
      setDrawerVisable(type);
    });
  }, []);
  useEffect(() => {
    sliderX.current.slick.slickGoTo(slideIndex - 1);
    console.log("slideIndex", slideIndex);
  }, [slideIndex]);
  useEffect(() => {
    // console.log('define - updateAccordionIndexEmit');
    socket.on("updateAccordionIndexEmit", (key) => {
      console.log("updateAccordionIndexEmit", key.accordionIndex);
      setAccordionIndex(key.accordionIndex);
    });
  }, []);
  const onAccordionChange = (key) => {
    console.log("onAccordionChange", key);
    setAccordionIndex(key);
    if (key) {
      socket.emit("updateAccordionIndex", key, () => {});
    }
  };
  return (
    <Carousel ref={sliderX} {...settings}>
      <div>
        <img src="https://wowslider.com/sliders/demo-77/data1/images/road220058.jpg" />
        <SayHi />
        <p className="flex-caption">Adventurer Cheesecake Brownie</p>
      </div>
      <div>
        {accordionIndex}
        <Collapse
          onChange={onAccordionChange}
          activeKey={accordionIndex}
          destroyInactivePanel={true}
        >
          <Panel
            header="This is panel header 1"
            key="1"
            onClick={onAccordionChange}
          >
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
      <div>
        <MySteps />
        <p className="flex-caption">Adventurer Cheesecake Brownie</p>
      </div>
      <div>
        <img src="https://smartslider3.com/wp-content/uploads/slider51/dynamic4.jpeg" />
        <p className="flex-caption">Adventurer Cheesecake Brownie</p>
      </div>
      <div>
        <YoutubeVideo />
      </div>
      <div>
        <Ending drawerVisable={drawerVisable} />
        <Result
          icon={<SmileOutlined />}
          title="Great, we have done all the operations!"
          extra={<Button type="primary">Next</Button>}
        />
      </div>
    </Carousel>
  );
}
// Slider.defaultProps = {
// 	slideIndex: 0
// };

export default SliderParent;
