import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';
import { socket } from '../service/socket';

export class User {
	// todos = [ { id: 1, text: 'Buy eggs', completed: true }, { id: 2, text: 'Write a post', completed: false } ];
	asHost = false;
	isMenuOn = true;
	userName = '';
	userList = [];
	// get remainingTodos() {
	// 	return this.todos.filter((t) => !t.completed).length;
	// }
	switchAsHost = () => {
		this.asHost = !this.asHost;
		console.log(this.asHost);
	};
	swithcMenu = () => {
		this.isMenuOn = !this.isMenuOn;
		console.log('swithcMenu', this.isMenuOn);
		socket.emit('swithcMenu', this.isMenuOn);
	};
}

decorate(User, {
	asHost: observable,
	isMenuOn: observable
	// remainingTodos: computed
});

export default createContext(new User());
