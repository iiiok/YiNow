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
import './test.css';
const { Panel } = Collapse;
const { Meta } = Card;

const pendingList_mock = [
    {
        item: 'FO',
        value: false,
    },
    {
        item: 'Client',
        value: true,
    },
];

function Test({ slideIndex }) {
    const [pendingList, setPendingList] = useState(pendingList_mock);
    const updatePending = (e, i) => {
        console.log('updatePending', e);
        console.log('index', i);
        setPendingList(prevItems => {
            prevItems[i].value = e;
            return [...prevItems];
        });
    };
    const isPendingsResolved = every(pendingList, ['value', false]);
    return (
        <div className="pending_block">
            <Card title="Pending Tasks" hoverable>
                <div className="block_list">
                    {pendingList &&
                        pendingList.map((o, i) => (
                            <div>
                                Pending with {o.item + ' '}
                                <Switch
                                    onChange={e => updatePending(e, i)}
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
                                    checked={o.value}
                                />
                            </div>
                        ))}
                </div>
                <div>
                    {isPendingsResolved ? 'all resolved' : 'still pending'}
                    {JSON.stringify(pendingList)}
                </div>
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
