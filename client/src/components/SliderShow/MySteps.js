import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider, Card } from 'antd';
import { socket } from '../../service/socket';
import MyAccordion from '../Accordion/Accordion';
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
				<Step title="Minimum Network Dependency" />
				<Step title="More than PPT" />
			</Steps>
			<Divider />
			{currentStep === 0 && <MyAccordion />}
			{currentStep === 1 && <MyAccordion />}
			{currentStep === 2 && <MyAccordion />}
		</Card>
	);
}

export default MySteps;
