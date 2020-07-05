import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider,Card } from 'antd';
import { socket } from '../../service/socket';
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
				<Step
					title="Rich Medias"
					subTitle="Video, Web, Intraction"
					description="We can do a lot more then a PPT format"
				/>
				<Step title="Set Clear  Priorities" subTitle="Measurement" description="Decide What To Measure..." />
				<Step title="Interpret Results" subTitle="images" description=" key questions" />
			</Steps>
			<Divider />
			{
				(currentStep ===0) && (<p>
					 1. The presentr'll be about to navigate the pages easily. \
				</p>
					)
			}
			{
				(currentStep ===1) && (<p>
					2. 0 pixal transfer lost, the attendees have a clear view as the  presenter. 3.Bandwith \
That is more..."
				</p>
					)
			}

		</Card>
	);
}

export default MySteps;
