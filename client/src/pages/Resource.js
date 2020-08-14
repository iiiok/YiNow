import React from 'react';
import { Row, Col, Icon, List, Tabs, Card } from 'antd';
import { socket } from '../service/socket';
import resource from '../service/resource';
import { Divider } from 'antd';

export default () => {
  return (
    <Card title="Some useful links and some tech-stacks are applied.">
      <List
        itemLayout="horizontal"
        dataSource={resource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href={item.url} target="resource">
                  {item.title}
                </a>
              }
              description={item.desc}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
