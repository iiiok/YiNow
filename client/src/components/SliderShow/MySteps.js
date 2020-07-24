import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider, Card } from 'antd';
import { socket } from '../../service/socket';
import MyAccordion from '../Accordion/Accordion';
import MyAccordionWhy from '../Accordion/Accordion_why';
import MyAccordionFuture from '../Accordion/Accordion_future';
const { Step } = Steps;

function MySteps() {
  const [ currentStep, setCurrentStep ] = useState(0);

  const onChangeStep = (key) => {
    socket.emit('setCurrentStep', key);
    setCurrentStep(key);
  };

  useEffect(() => {
    socket.on('setCurrentStepEmit', (key) => {
      console.log('got a setCurrentStepEmit', key);
      setCurrentStep(key);
    });
  }, []);

  return (
    <Card title={'Why do we need this new way of sharing PPT?'}>
      <Steps
        type="navigation"
        size="small"
        current={currentStep}
        onChange={onChangeStep}
        className="site-navigation-steps"
      >
        <Step title="Traditional Online Meeting" />
        <Step title="Why webSocket?" />
        <Step title="More than a PPT" />
      </Steps>
      {currentStep === 0 && <MyAccordion />}
      {currentStep === 1 && <MyAccordionWhy />}
      {currentStep === 2 && <MyAccordionFuture />}
    </Card>
  );
}

export default MySteps;
