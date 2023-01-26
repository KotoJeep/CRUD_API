import { IncomingMessage, ServerResponse } from 'http';
import { CollectionUsers } from '../users/collectionUsers';
import { getPostData } from '../helpers/getPostData';

import { validateBodyData } from '../helpers/validateBodyData';
import { validate } from 'uuid';
import { ResponseFromServer } from '../helpers/serverResponse';

const collectionUsers: CollectionUsers = new CollectionUsers();

class UserController {
	private readonly req: IncomingMessage;
	private readonly res: ServerResponse;
	private response: ResponseFromServer;

	constructor(req: IncomingMessage, res: ServerResponse) {
		this.req = req;
		this.res = res;
		this.response = new ResponseFromServer(this.res);
	}

	async getAllUsers(): Promise<void> {
		this.res.statusCode = 200;
		const users = JSON.stringify(collectionUsers.getAll());
		// const users = collectionUsers.getAll();
		this.res.end(users);
	}

	async getOneUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const user = await collectionUsers.getOne(userId);
			if (user) {
				this.response.success(JSON.stringify(user));
			} else {
				this.response.notFound(`This record doesn't exist!`);
			}
		} else {
			this.response.notValid(`UserId isn't valid (not uuid)!`);
		}
	}

	async createUser(): Promise<void> {
		const body = JSON.parse(await getPostData(this.req));
		if (validateBodyData(body)) {
			this.res.writeHead(201, { 'Content-Type': 'application/json' });
			const newUser = JSON.stringify(await collectionUsers.create(body));
			this.res.end(newUser);
		} else {
			this.response.notValid('Body does not contain required fields');
		}
	}

	async updateUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const body = JSON.parse(await getPostData(this.req));
			const user = await collectionUsers.update(userId, body);
			if (user) {
				this.response.success(JSON.stringify(user));
			} else {
				this.response.notFound(`This record doesn't exist!`);
			}
		} else {
			this.response.notValid(`UserId isn't valid (not uuid)!`);
		}
	}

	async deleteUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const confirmDelete = collectionUsers.delete(userId);
			if (confirmDelete) {
				this.res.end('The record is found and deleted!');
				this.res.writeHead(204, { 'Content-Type': 'application/json' });
			} else {
				this.response.notFound(`This record doesn't exist!`);
			}
		} else {
			this.response.notValid(`UserId isn't valid (not uuid)!`);
		}
	}
}

export default UserController;
