import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider } from 'antd';
import { socket } from '../../service/socket';
const { Step } = Steps;

const demos = {
	0: '<iframe  width="100%" height="600px" scrolling="auto" frameborder="no"  style="background: #FFFFFF;" src="https://www.youtube.com/embed/yZvsqm4Jok8"></iframe>',
	2: '<iframe  width="100%" height="4206px" scrolling="yes" scrolling="auto" frameborder="yes"  style="background: #FFFFFF;"  src="https://www.tmall.hk/"></iframe>',
	// 1: '<iframe  width="100%" height="606" scrolling="yes" scrolling="auto" frameborder="no" src="https://zellwk.com/blog/async-await-express/"></iframe>',
	1: '<iframe  width="100%" height="1206px" scrolling="auto" scrolling="auto" frameborder="no"   style="background: #FFFFFF;" src="https://www.wix.com/website/templates"></iframe>',
	3: '<iframe  width="100%" height="auto" scrolling="auto" scrolling="auto" frameborder="no"  style="background: #FFFFFF;"  src="https://www.apple.com/"></iframe>'
};

function Iframe(props) {
	return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
	// return <div dangerouslySetInnerHTML={{ __html: "props.iframe ? props.iframe : ''" }} />;
}

function My_Ifram() {
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
		<div>
			<Steps
				type="navigation"
				size="small"
				current={currentStep}
				onChange={onChangeStep}
				className="site-navigation-steps"
			>
				<Step title="A YouTube Video" description="--Perfect--" />
				<Step title="Wix.com" description="--Works--" />
				<Step title="Tao Bao" description="--Console Warning--" />
				<Step title="Apple.com" subTitle="" description="--Doesn't work--" />
			</Steps>
			<Divider />
			<Iframe iframe={demos[currentStep]} allow="autoplay" />
		</div>
	);
}

export default My_Ifram;
