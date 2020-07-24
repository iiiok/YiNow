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
  BarcodeOutlined,
  WechatOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  LaptopOutlined,
  FundProjectionScreenOutlined,
  IssuesCloseOutlined,
  FastForwardOutlined,
  CarryOutOutlined,
  ReadOutlined,
  AudioOutlined,
  YoutubeOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const menuConfig = [
  {
    key: 1,
    icon: EnvironmentOutlined,
    title: 'Welcome',
    conpoment: 'Wellcome'
  },
  {
    key: 11,
    icon: ReadOutlined,
    title: 'Simple Example'
  },
  {
    key: 22,
    icon: QuestionCircleOutlined,
    title: 'Reasons Why'
  },
  {
    icon: ExperimentOutlined,
    title: 'Behind the Scene',
    key: 'sub3',
    children: [
      {
        key: 36,
        title: 'Real-time Communication',
        icon: SplitCellsOutlined,
        conpoment: 'Wellcome'
      },
      {
        key: 31,
        title: 'WebSocket & socket.io',
        icon: ToolOutlined,
        conpoment: 'Wellcome'
      },
      {
        key: 32,
        title: 'Architecture',
        icon: ClusterOutlined,
        conpoment: 'Wellcome'
      }
    ]
  },

  {
    key: 993,
    icon: 'mail',
    title: 'EMC测试科',
    url: ''
  }
];

export default menuConfig;
