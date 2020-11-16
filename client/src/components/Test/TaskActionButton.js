import React, { useState, useEffect } from 'react';
import { Carousel, Layout, Menu, Row, Card, Switch, Col,Button } from 'antd';

import {
    UserOutlined,
    PauseCircleOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SmileOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';


function TaskActionButton({ taskObj, takeAction }) {
    // const [currentPendingList, setCurrentPendingList] = useState(pendingList);
    // const updatePending = (e, i) => {
    //     console.log('updatePending', e);
    //     console.log('index', i);
    //     // setPendingList(prevItems => {
    //     //     prevItems[i].value = e;
    //     //     return [...prevItems];
    //     // });
    // };
    // const isPendingsResolved = every(pendingList, ['value', false]);
    const {name} = taskObj;
    return (
        <div className="">
            <Button onClick={()=>takeAction(name)} disabled={taskObj.status!=="ready"} type="primary">{name}</Button>
        </div>
    );
}

export default TaskActionButton;
