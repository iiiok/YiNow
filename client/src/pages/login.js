import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { socket } from '../service/socket';
import UserStore from '../service/UserStore';
import { Observer, useObserver, observer } from 'mobx-react';
import '../css/material-pro.min.css';
// import { Row, Col, Icon, Button, Layout, Menu, Card } from 'antd';

const x = 99; //上限
const y = 10; //下限
const rand = parseInt(Math.random() * (x - y + 1) + y);

export default observer(({}) => {
  const store = useContext(UserStore);
  const [ userName, setUserName ] = useState('John Smith-' + rand);
  store.userName = userName;
  const [ isSuccess, setIsSuccess ] = useState(false);
  const onHandleLogin = (event) => {
    event.preventDefault();
    console.log('onHandleLogin', userName);
    socket.emit('sendNotice', { userName: userName, message: 'Just login.' }, () => {});
    setIsSuccess(true);
  };

  return (
    <div className="main-wrapper">
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center login_bg">
        <div className="center-box">
          {!isSuccess ? (
            <h1 className="center-title">
              WebSocket Web App to Support <br />Full-duplex Event Broadcast
            </h1>
          ) : (
            <Redirect to="onAir" />
          )}
          <div className="auth-box p-4 bg-white rounded">
            <div id="loginform">
              <div className="logo">
                <h3 className="box-title mb-3">Demo Sign In</h3>
              </div>
              <div className="row">
                <div className="col-12">
                  <form
                    className="form-horizontal mt-3 form-material"
                    onSubmit={onHandleLogin}
                    id="loginform_acttion"
                    // action="/onAir?userName=john"
                  >
                    <div className="form-group mb-3">
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          required=""
                          id="loginform_user"
                          placeholder="Username"
                          onChange={(e) => setUserName(e.target.value)}
                          defaultValue={userName}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div>
                        <input
                          className="form-control"
                          disabled
                          style={{ backgroundColor: 'silver' }}
                          type="password"
                          required=""
                          placeholder="Password"
                          value="******"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="d-flex">
                        <div className="checkbox checkbox-info pt-0">
                          <input id="checkbox-asHost" type="checkbox" className="material-inputs chk-col-indigo" />
                          <label htmlFor="checkbox-asHost"> I am the host </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-center mt-4">
                      <div className="col-xs-12">
                        <button
                          className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                          id="submit"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 mt-2 text-center">
                        <div className="social mb-3">
                          <a data-toggle="tooltip" title="Login with Google">
                            <img src="images/facebook-logo.png" width="40px" />
                          </a>
                          <a data-toggle="tooltip" title="Login with Facebook">
                            <img src="images/weChat.jpg" width="40px" />
                          </a>

                          <a data-toggle="tooltip" title="Login with Google">
                            <img src="images/twitter.jpg" width="40px" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-0 mt-4">
                      <div className="col-sm-12 justify-content-center d-flex">
                        <p>
                          Domo login, Just give it a name and
                          <a id="join" className="text-info font-weight-normal ml-1">
                            Join
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
