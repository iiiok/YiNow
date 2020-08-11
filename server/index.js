const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
let userList = new Set();
let vote1 = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 };
let sliderIndex = 1;
let bgImgVal = 0;
app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.removeAllListeners(); //no use
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    socket.join('ChatRoom-1');
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to('ChatRoom-1').emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to('ChatRoom-1').emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to('ChatRoom-1').emit('message', { user: user.name, text: message });
    // io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });
  socket.on('sendNotice', (message, callback) => {
    // console.log(socket.id);
    console.log(message.userName, 'send message', message.message);
    socket.broadcast.emit('sendNoticeEmit', { user: message.userName, text: message.message });

    callback();
  });
  socket.on('sendAImage', (message, callback) => {
    // console.log(socket.id);
    console.log(message.userName, 'send a picture', message.imgUrl);
    io.emit('sendAImageEmit', { user: message.userName, imgUrl: message.imgUrl });

    callback();
  });
  socket.on('updateSliderIndex', (key, callback) => {
    // const user = getUser(socket.id);
    // console.log('object', key, new Date().getTime());
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('updateSliderIndexEmit', { sliderIndex: key });
    sliderIndex = key;
    callback();
  });

  socket.on('updateAccordionIndex', (key) => {
    console.log('accordionIndex', key);
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    io.emit('updateAccordionIndexEmit', { accordionIndex: key });
  });
  socket.on('syncScrollPosition', (key, callback) => {
    console.log('syncScrollPositionEmit', key, new Date().getTime());
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('syncScrollPositionEmit', { newPosition: key });

    // callback();
  });
  socket.on('updateSubmenuOpen', (key, callback) => {
    console.log('updateSubmenuOpenEmit', key);
    socket.broadcast.emit('updateSubmenuOpenEmit', key);

    // callback();
  });
  socket.on('syncSlider', (obj) => {
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('syncSliderEmit-' + obj.sliderId, { index: obj.index });
    console.log('syncSlider', 'syncSliderEmit-' + obj.sliderId, obj.index);

    // callback();
  });
  socket.on('sayHi2All', () => {
    console.log('sayHi to Clients');
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('sayHiEmit', {});
  });
  socket.on('setShowModal', (value) => {
    console.log('setShowModal to', value);
    socket.broadcast.emit('setShowModalEmit', value);
  });
  socket.on('setShowPicModal', ({ url, setVisible }) => {
    console.log('setShowPicModal to', url, setVisible);
    socket.broadcast.emit('setShowPicModalEmit', { url, setVisible });
  });
  socket.on('openDrawer', (type) => {
    console.log('openDrawer');
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('openDrawerEmit', type);
  });
  socket.on('swithcMenu', (type) => {
    console.log('swithcMenu', type);
    socket.broadcast.emit('swithcMenuEmit', type);
  });
  socket.on('setCurrentStep', (key) => {
    console.log('setCurrentStep');
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('setCurrentStepEmit', key);
  });
  socket.on('onSwitchiLX', (key) => {
    console.log('onSwitchiLX:', key);
    socket.broadcast.emit('onSwitchiLXEmit', key);
  });
  socket.on('syncVideoPlay', (key) => {
    console.log('syncVideoPlay:', key);
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('syncVideoPlayEmit', key);
  });
  socket.on('highLightScript', ({ _isHighLined, _scriptId }) => {
    console.log('highLightScript:', _scriptId);
    console.log('isHighLined:', _isHighLined);
    socket.broadcast.emit('highLightScriptEmit', { _isHighLined, _scriptId });
  });
  socket.on('setListFocus', ({ listId, key }) => {
    console.log('setListFocus:', listId, key);
    socket.broadcast.emit('setListFocusEmit', { emitListId: listId, key });
  });
  socket.on('syncVideoVolume', (val) => {
    console.log('syncVideoVolume:', val);
    socket.broadcast.emit('syncVideoVolumeEmit', val);
  });
  socket.on('sayHiLogin', (val) => {
    userList.add(val);
    console.log('userList', userList);
    socket.broadcast.emit('sayHiLoginEmit', userList.size);
  });
  socket.on('syncShowingTab', (key) => {
    console.log('syncShowingTab:', key);
    // io.to('react').emit('message', { user: 'user.name', text: 'message' });
    socket.broadcast.emit('syncShowingTabEmit', key);
  });
  socket.on('voteFor', (key) => {
    console.log('voteFor:', key);
    vote1[key] = vote1[key] + 1;
    console.log('voteForKey:', vote1);
    io.emit('voteForEmit', vote1);
  });
  socket.on('openALink', (key) => {
    console.log('openALink:', key);
    socket.broadcast.emit('openALinkEmit', key);
  });
  socket.on('dataShowntoggle', (key) => {
    console.log('dataShowntoggle:', key);
    socket.broadcast.emit('dataShowntoggleEmit', key);
  });
  socket.on('closeALink', () => {
    console.log('closeALink:');
    socket.broadcast.emit('closeALinkEmit');
  });
  socket.on('changeBackground', () => {
    bgImgVal = bgImgVal < 15 ? ++bgImgVal : 0;
    console.log('changeBackground:', bgImgVal);
    io.emit('changeBackgroundEmit', bgImgVal);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
  // setInterval(() => {
  //   socket.broadcast.emit('updateSliderIndexEmit', { sliderIndex: sliderIndex });
  //   socket.broadcast.emit('sayHiLoginEmit', userList.size);
  //   // console.log('Broadcast SliderId', sliderIndex);
  // }, 4000);

  // let counter = 0;
  // setInterval(() => {
  // 	++counter;
  // 	socket.emit('ping', { counter }); // the object will be serialized for you
  // }, 6000);
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
