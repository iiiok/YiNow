import React, { useState, useEffect, useRef } from 'react';
import YouTube from '@u-wave/react-youtube';
import { Divider, Card } from 'antd';

function Ending() {
	return (
		<div>
			<Card title={'Thank you for attending.'}>
				<YouTube video="gLLl3VbNFXg" height={580} autoplay width="100%" controls={true} volume={0.3} />
			</Card>
			<Divider />
			<p className="flex-caption">Adventurer Cheesecake Brownie</p>
			<Divider />
		</div>
	);
}

export default Ending;
