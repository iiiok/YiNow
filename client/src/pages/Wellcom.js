import React, { useContext } from 'react';
import UserStore from '../service/UserStore';
import { Card } from 'antd';
import { observer } from 'mobx-react';
import HostScript from '../components/TextView/HostScript';
import { paragraph1 } from '../service/dummyDate';

export default observer(({}) => {
  const store = useContext(UserStore);

  return (
    <Card title={'Hi, ' + store.userName + '. Welcome to the meeting.'}>
      <p>
        <img src="https://wowslider.com/sliders/demo-77/data1/images/road220058.jpg" alt="" width="100%" />
      </p>
      <HostScript script={paragraph1} asHost={store.asHost} />
      <p className="flex-caption">EPAM SYSTEM 2020</p>
    </Card>
  );
});
