import React, { useState, useEffect } from 'react';
import { socket } from '../../service/socket';
import highLightScripts from '../../service/highLightScripts';

export default ({ scriptId, header }) => {
  const [ isHighLined, setIsHighLined ] = useState(false);
  const changeStyle = () => {
    if (scriptId) {
      socket.emit('highLightScript', { _isHighLined: !isHighLined, _scriptId: scriptId });
    }
    setIsHighLined(!isHighLined);
  };
  useEffect(() => {
    socket.on('highLightScriptEmit', ({ _isHighLined, _scriptId }) => {
      console.log('highLightScriptEmitEmit', _isHighLined, _scriptId);
      scriptId === _scriptId && setIsHighLined(_isHighLined);
    });
  }, []);

  return (
    <blockquote onClick={changeStyle} className={isHighLined ? 'isHighlighted' : ''}>
      {header && <h3>{header}</h3>}
      {highLightScripts[scriptId]}
    </blockquote>
  );
};
