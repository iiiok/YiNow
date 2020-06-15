import React, { useState, useEffect, useRef } from 'react';
import { Steps } from 'antd';
import { Divider } from 'antd';
import { socket } from '../../service/socket';
const { Step } = Steps;

const demos =
	'<iframe width="100%" height="606" scrolling="auto" frameborder="no"  src="https://www.youtube.com/embed/gLLl3VbNFXg?autoplay=1"></iframe>';

function Iframe(props) {
	return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
}

function MySteps() {
	return (
		<div>
			<Divider />
			<Iframe iframe={demos} allow="autoplay" />
			<Divider />
		</div>
	);
}

export default MySteps;
