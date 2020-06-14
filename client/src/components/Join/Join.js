import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Checkbox } from 'antd';

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [asHost, setasHost] = useState(false);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} defaultValue="ivan"/>
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} defaultValue="test"/>
        </div>
        <Checkbox onChange={(event) => setasHost(event.target.value)} >As the host</Checkbox>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/slick?isHost=${asHost}&name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
