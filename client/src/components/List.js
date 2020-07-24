import React, { useState, useEffect } from 'react';
import { socket } from '../service/socket';

export default ({ listId, listArry, title }) => {
  const [ currentFocus, setCurrentFocus ] = useState(0);

  useEffect(() => {
    socket.on('setListFocusEmit', ({ emitListId, key }) => {
      console.log('got a setListFocusEmit', listId, key);
      if (emitListId === listId) {
        setCurrentFocus(key);
      }
    });
  }, []);
  const highLight = (key) => {
    setCurrentFocus(key);
    socket.emit('setListFocus', { listId, key });
  };

  return (
    <ul className="ws_ul">
      {listArry &&
        listArry.map((list) => (
          <li
            key={list.id}
            onClick={() => highLight(list.id)}
            className={currentFocus === list.id ? 'current_focus' : 'clean_focus'}
          >
            {list.value}
          </li>
        ))}
    </ul>
  );
};
