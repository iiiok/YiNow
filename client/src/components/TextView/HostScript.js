import React, { useState, useEffect, useContext } from 'react';
import { Typography } from 'antd';
import { observer, useObservable, useLocalStore } from 'mobx-react';
import UserStore from '../../service/UserStore';

const { Text, Paragraph } = Typography;

export default ({ script }) => {
	// const [ tabIndex, setTabIndex ] = useState(0);
	const asHost = useContext(UserStore).asHost;
	const [ showingScript, setShowingScript ] = useState(script);
	const onChange = (str) => {
		console.log('Content change:', str);
		setShowingScript(str);
	};

	return (
		asHost && (
			<Paragraph mark editable={{ onChange: onChange }} ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>
				{showingScript}
			</Paragraph>
		)
	);
};
