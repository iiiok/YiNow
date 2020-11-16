import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Layout, Menu, Row, Card, Switch, Result, Button, Divider, Collapse, Modal } from 'antd';
import { every, find } from 'lodash';
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
import TaskActionButton from './TaskActionButton';
import './test.css';
import PendingList from './PendingList';
const { Panel } = Collapse;
const { Meta } = Card;

const currentTask_mock = [
    {
        name: 'FO Doc Ready',
        Id: 12,
        //init, ready, pending, complete
        status: 'init',
        pending: [
            {
                name: 'FO',
                taskId: 12,
                //true, false
                status: false,
            },
            {
                name: 'something',
                taskId: 12,
                status: false,
            },
        ],
    },
    {
        name: 'Client init',
        Id: 13,
        status: 'init',
        pending: [{ name: 'Client', taskId: 13, status: true }],
    },
];


const currentTask_mock2 = [
    {
        name: 'ABC',
        Id: 12,
        //init, ready, pending, complete
        status: 'init',
        pending: [
            {
                name: 'Client',
                taskId: 12,
                //true, false
                status: false,
            },
            {
                name: 'Baba',
                taskId: 12,
                status: false,
            },
            {
                name: 'BiLi',
                taskId: 12,
                status: false,
            },
        ],
    },
    {
        name: 'Task-B',
        Id: 13,
        status: 'init',
        pending: [{ name: 'Food', taskId: 13, status: true }],
    },
];


function Test({  }) {
    const [currentTask, setCurrentTask] = useState(currentTask_mock);
    const updatePending = (taskNo, i, e) => {
        console.log('updatePending', e);
        console.log('index', i);
        console.log('taskNo', taskNo);
        setCurrentTask(prevItems => {
            prevItems[taskNo].pending[i].status = e;
            const isPendingsResolved = every(prevItems[taskNo].pending, ['status', false]);
            prevItems[taskNo].status = isPendingsResolved ? "ready" : "pending";
            return [...prevItems];
        });
    };
    const onTakeAction = (name) => {
        console.log('updatePending', name);
        setCurrentTask(prevItems => {
            find(prevItems, {name: name}).status = "complete";
            return [...prevItems];
        });
    };
    const onNext = () =>{
        setCurrentTask(currentTask_mock2);
    }
    const isAllTaskComplete = every(currentTask, ['status', "complete"]);
    return (
        <div className="pending_block">
            <Card title="Pending Tasks" hoverable>
                <div className="block_list">
                    {currentTask &&
                        currentTask.map((t, i) => (
                            <div key={i}>
                                Task: {t.name}
                                <br />
                                It is <Button>{t.status}</Button><br />
                                <PendingList pendingList={t.pending} updatePending={updatePending} taskNo={i} />
                                <Divider></Divider>
                                <TaskActionButton taskObj={t} takeAction={onTakeAction} />
                            </div>
                        ))}
                </div>
                <Divider></Divider>
                { isAllTaskComplete ? <Button type="primary" onClick={onNext}>Next Step</Button> : null}
                <div>{/* {JSON.stringify(currentTask)} */}</div>
                {/* <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        Pending with FO{' '}
                        <Switch
                            checkedChildren={
                                <div>
                                    <CloseCircleOutlined /> Pending
                                </div>
                            }
                            unCheckedChildren={
                                <div>
                                    Resolved <CheckOutlined />
                                </div>
                            }
                            defaultChecked
                        />
                    </Col>
                    <Col className="gutter-row" span={6}></Col>
                    <Col className="gutter-row" span={6}>
                        <div>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div>col-6</div>
                    </Col>
                </Row> */}
            </Card>
        </div>
    );
}

export default Test;
