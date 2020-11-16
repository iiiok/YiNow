import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Row, Card, Switch, Col } from 'antd';
import { Result, Button, Divider, Progress, Collapse, Modal } from 'antd';
import { every } from 'lodash';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
    UserOutlined,
    PauseCircleOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SmileOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';



function PendingList({ pendingList, updatePending, taskNo }) {
    const [currentPendingList, setCurrentPendingList] = useState(pendingList);
    // const updatePending = (e, i) => {
    //     console.log('updatePending', e);
    //     console.log('index', i);
    //     // setPendingList(prevItems => {
    //     //     prevItems[i].value = e;
    //     //     return [...prevItems];
    //     // });
    // };
    // const isPendingsResolved = every(pendingList, ['value', false]);
    return (
        <div className="pending_block">
            <Card title="Pending Tasks" hoverable>
                <div className="block_list">
                    {pendingList &&
                        pendingList.map((o, i) => (
                            <div key={i}>
                               Pending With: {o.name}<br />It is <Button>{o.status}</Button>
                                
                                <Switch
                                    onChange={e => updatePending(taskNo, i, e)}
                                    checkedChildren={
                                        <div>
                                            <PauseCircleOutlined /> Pending
                                        </div>
                                    }
                                    unCheckedChildren={
                                        <div>
                                            Resolved <CheckOutlined />
                                        </div>
                                    }
                                    checked={o.status}
                                />
                                 
                            </div>
                        ))}
                </div>
                <div>
                    {/* {currentTask ? 'all resolved' : 'still pending'}
                    {JSON.stringify(currentTask)} */}
                </div>

            </Card>
        </div>
    );
}

export default PendingList;
