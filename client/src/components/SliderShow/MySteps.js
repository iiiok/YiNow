import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider } from 'antd';
import { socket } from '../../service/socket';
import ReactDOM from 'react-dom';
const { Step } = Steps;

const demos = {
	0: '<iframe  width="100%" height="606" scrolling="auto" frameborder="no"  src="https://www.youtube.com/embed/yZvsqm4Jok8"></iframe>',
	1: '<iframe  width="100%" height="606" scrolling="yes" scrolling="auto" frameborder="no" src="https://zellwk.com/blog/async-await-express/"></iframe>',
	2: '<iframe  width="100%" height="606" scrolling="auto" scrolling="auto" frameborder="no" src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png"></iframe>'
};

// this.state = {
// 	iFrameHeight: '100%'
// };
function Iframe(props) {
	const [ iFrameHeight, setIFrameHeight ] = useState('100%');
	const iframX = useRef();
	// return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
	// return <div dangerouslySetInnerHTML={{ __html: "props.iframe ? props.iframe : ''" }} />;
	return (
		<iframe
			style={{ width: '100%', height: iFrameHeight, overflow: 'visible' }}
			onLoad={() => {
				// const obj = ReactDOM.findDOMNode(iframX);
				console.log(iframX);
				// setIFrameHeight(obj.contentWindow.document.body.scrollHeight + 'px');
				// console.log('iframe', obj.contentWindow.document.body.scrollHeight);
			}}
			height={iFrameHeight}
			ref={iframX}
			src="https://zellwk.com/blog/async-await-express/"
			width="100%"
			scrolling="no"
			frameBorder="0"
		/>
	);
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
			</Steps>
			<Divider />
			{currentStep < 2 && <Iframe iframe={demos[currentStep]} allow="autoplay" />}
			{currentStep == 2 && (
				<center>
					<img src="https://images.presentationgo.com/2016/02/7Stairs-Steps-Slide-Template.png" />
				</center>
			)}
			<Divider />
			{demos[currentStep]}
		</div>
	);
}

export default MySteps;
