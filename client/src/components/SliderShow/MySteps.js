import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider } from 'antd';
import { Drawer, List, Avatar, Col, Row } from 'antd';
import io from 'socket.io-client';
const { Step } = Steps;
let socket;
const ENDPOINT = 'http://10.22.17.90:5000/';
socket = io(ENDPOINT);
const demos = {
	0: '<iframe width="100%" height="606" scrolling="auto" frameborder="no"  src="https://www.youtube.com/embed/yZvsqm4Jok8"></iframe>',
	1: '<iframe width="100%" height="606" scrolling="no" scrolling="auto" frameborder="no" src="https://www.bing.com"></iframe>',
	2: '<iframe width="100%" height="606" scrolling="no" scrolling="auto" frameborder="no" src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png"></iframe>',
	3: '<iframe width="100%" height="606" frameborder="no"  src="https://www.youtube.com/embed/gLLl3VbNFXg?autoplay=1"></iframe>'
};

function Iframe(props) {
	return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
}

function MySteps() {
	const [ currentStep, setCurrentStep ] = useState(1);

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
		<div>
			<Steps
				type="navigation"
				size="small"
				current={currentStep}
				onChange={onChangeStep}
				className="site-navigation-steps"
			>
				<Step
					title="Define Your Questions"
					subTitle="Video"
					description="The 5 Main Steps Of The Lean Manager"
				/>
				<Step title="Set Clear  Priorities" subTitle="Measurement" description="Decide What To Measure..." />
				<Step title="Interpret Results" subTitle="images" description=" key questions" />
				<Step title="The End" subTitle="video" description="Thank you!" />
			</Steps>
			<Divider />
			<Iframe iframe={demos[currentStep]} allow="autoplay" />
			<Divider />
			{demos[currentStep]}
		</div>
	);
}

export default MySteps;
