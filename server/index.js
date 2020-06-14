const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
	socket.removeAllListeners(); //no use
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, userName, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});
	socket.on('updateSliderIndex', (key, callback) => {
		// const user = getUser(socket.id);
		console.log('object', key, new Date().getTime());
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		socket.broadcast.emit('updateSliderIndexEmit', { sliderIndex: key });

		callback();
	});

	socket.on('updateAccordionIndex', (key, callback) => {
		console.log('accordionIndex', key);
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		io.emit('updateAccordionIndexEmit', { accordionIndex: key });

		callback();
	});
	socket.on('syncScrollPosition', (key, callback) => {
		console.log('syncScrollPositionEmit', key, new Date().getTime());
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		socket.broadcast.emit('syncScrollPositionEmit', { newPosition: key });

		// callback();
	});
	socket.on('sayHi2All', () => {
		console.log('sayHi to Clients');
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		socket.broadcast.emit('sayHiEmit', {});
	});
	socket.on('openDrawer', (type) => {
		console.log('openDrawer');
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		socket.broadcast.emit('openDrawerEmit', type);
	});
	socket.on('setCurrentStep', (key) => {
		console.log('setCurrentStep');
		// io.to('react').emit('message', { user: 'user.name', text: 'message' });
		socket.broadcast.emit('setCurrentStepEmit', key);
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
			io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		}
	});
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
