import { IncomingMessage, ServerResponse } from 'http';
import { CollectionUsers } from '../users/collectionUsers';

class UserController {
	private req: IncomingMessage;
	private res: ServerResponse;
	private collectionUsers: CollectionUsers = new CollectionUsers();

	constructor(req: IncomingMessage, res: ServerResponse) {
		this.req = req;
		this.res = res;
	}

	getAllUsers(): void {
		this.res.statusCode = 200;
		this.res.end(this.collectionUsers.getAll());
	}

	getOneUser() {}

	createUser() {}

	updateUser() {}

	deleteUser() {}
}

export default UserController;
