import { createContext } from 'react';
import { decorate, observable, computed } from 'mobx';

export class User {
	// todos = [ { id: 1, text: 'Buy eggs', completed: true }, { id: 2, text: 'Write a post', completed: false } ];
	asHost = false;
	userName = 'ivan';
	userList = [];
	// get remainingTodos() {
	// 	return this.todos.filter((t) => !t.completed).length;
	// }
	switchAsHost = () => {
		this.asHost = !this.asHost;
		console.log(this.asHost);
	};
}

decorate(User, {
	asHost: observable
	// remainingTodos: computed
});

export default createContext(new User());
