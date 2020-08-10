import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Button, Divider, Switch, Card, Tag } from 'antd';
import { socket } from '../service/socket';
import menuConfig from '../service/menuConfig';
import {
  UserOutlined,
  ClusterOutlined,
  ExperimentOutlined,
  CheckOutlined,
  SplitCellsOutlined,
  RadarChartOutlined,
  ToolOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  BarcodeOutlined,
  FullscreenOutlined,
  WechatOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  LaptopOutlined,
  FundProjectionScreenOutlined,
  FileAddOutlined,
  IssuesCloseOutlined,
  FastForwardOutlined,
  CarryOutOutlined,
  ReadOutlined,
  AudioOutlined,
  YoutubeOutlined,
  SmileOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import SharedInfo from '../components/SharedInfo';
import SharedInfoShow from '../components/SharedInfo-show';
const Components = {
  11: EnvironmentOutlined,
  13: LaptopOutlined
};

const { SubMenu } = Menu;
const { Sider } = Layout;
const justSayHi = (userName) => {
  console.log('sendNotice', userName);
  socket.emit('sendNotice', { userName: userName, message: 'Just say hi.' }, () => {});
};

function Links({ onMenuChange, selectedKeys, userName, swithcMenu, isMenuOn, asHost }) {
  console.log('selectedKeys', selectedKeys);
  const [ currentMenu, setCurrentMent ] = useState(selectedKeys);
  const [ isSharedInfo, setSharedInfo ] = useState(false);
  const [ isSharedInfoShow, setSharedInfoShow ] = useState(false);
  const [ openKeys, setOpenKeys ] = useState([ '' ]);
  // const [ linksSwitch, setLinksSwitch ] = useState(isMenuOn);
  useEffect(
    () => {
      setCurrentMent(selectedKeys);
    },
    [ selectedKeys ]
  );
  useEffect(() => {
    socket.on('updateSubmenuOpenEmit', (key) => {
      console.log('updateSliderIndexEmit', key);
      setOpenKeys(key);
    });
  }, []);
  console.log(currentMenu);
  const onSubmenuChange = (openKeys) => {
    console.log('updateSubmenuOpen', openKeys);
    socket.emit('updateSubmenuOpen', openKeys, () => {});
    setOpenKeys(openKeys);
  };
  const changeBackground = () => {
    console.log('changeBackground');
    socket.emit('changeBackground');
  };
  const recursionMenu = (menuList) => {
    return menuList.map((menu, index) => {
      if (menu.children) {
        return (
          <SubMenu key={menu.key} title={menu.title}>
            {recursionMenu(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menu.key} icon={React.createElement(Components[11], null)}>
            {menu.title}
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Sider className="site-layout-background" width={200}>
      <Card size="small" title={userName}>
        {asHost && (
          <Switch checkedChildren="Showing" unCheckedChildren="Hiding" checked={isMenuOn} onChange={swithcMenu} />
        )}
      </Card>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onSelect={onMenuChange}
        onOpenChange={onSubmenuChange}
        //   defaultOpenKeys={currentMenu}
        //   defaultSelectedKeys={currentMenu}
        selectedKeys={currentMenu}
        // defaultOpenKeys={[ 'sub1' ]}
      >
        <Menu.Item key="1" icon={<EnvironmentOutlined />}>
          Welcome
        </Menu.Item>
        <Menu.Item key="11" icon={<ReadOutlined />}>
          Simple Example
        </Menu.Item>
        <Menu.Item key="22" icon={<QuestionCircleOutlined />}>
          Reasons Why
        </Menu.Item>
        <SubMenu key="sub3" icon={<ExperimentOutlined />} title="Behind the Scene">
          <Menu.Item key="36" icon={<SplitCellsOutlined />}>
            Real-time Communication
          </Menu.Item>
          <Menu.Item key="31" icon={<ToolOutlined />}>
            WebSocket & socket.io
          </Menu.Item>
          <Menu.Item key="32" icon={<ClusterOutlined />}>
            Architecture
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Playground">
          <Menu.Item key="14" icon={<SafetyOutlined />}>
            Intro & Vote
          </Menu.Item>
          <Menu.Item key="7" icon={<LaptopOutlined />}>
            iLearning
          </Menu.Item>
          <Menu.Item key="2" icon={<WechatOutlined />}>
            Chat Room
          </Menu.Item>
          <Menu.Item key="12" icon={<LineChartOutlined />}>
            Business Meeting
          </Menu.Item>
          <Menu.Item key="6" icon={<YoutubeOutlined />}>
            Videos
          </Menu.Item>
          <Menu.Item key="35" icon={<GlobalOutlined />}>
            Iframe Pages
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="13" icon={<FundProjectionScreenOutlined />}>
          Business Scenarios Event Syncing
        </Menu.Item>
        <Menu.Item key="34" icon={<FastForwardOutlined />}>
          What's Next
        </Menu.Item>
        <Menu.Item key="15" icon={<BarcodeOutlined />}>
          Resource
        </Menu.Item>
        <Menu.Item key="8" icon={<IssuesCloseOutlined />}>
          The Ending
        </Menu.Item>
        {/* {recursionMenu(menuConfig)} */}
      </Menu>
      <Divider />
      <Card size="small" title="Playground">
        <Tag icon={<SmileOutlined />} color="#2db7f5" onClick={() => justSayHi(userName)}>
          Say Hi
        </Tag>
        <Tag icon={<FullscreenOutlined />} color="#55acee" onClick={changeBackground}>
          Change Background
        </Tag>
        <Tag icon={<FileAddOutlined />} color="#87d068" onClick={() => setSharedInfo(!isSharedInfo)}>
          Post a screen
        </Tag>
        <Tag icon={<MenuFoldOutlined />} color="#55acee" onClick={() => setSharedInfoShow(!isSharedInfoShow)}>
          Show screen posts
        </Tag>
        <SharedInfo isOpen={isSharedInfo} onClose={() => setSharedInfo(false)} userName={userName} />
        <SharedInfoShow isOpen={isSharedInfoShow} onSwitch={(v) => setSharedInfoShow(v)} />
      </Card>
      <div className="centet_block" />
    </Sider>
  );
}

export default Links;
