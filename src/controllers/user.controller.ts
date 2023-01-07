import { IncomingMessage, ServerResponse } from 'http';
import { CollectionUsers } from '../users/collectionUsers';
import { getPostData } from '../helpers/getPostData';
import { IUser } from '../users/user.interface';
import { validateBodyData } from '../helpers/validateBodyData';
import { validate } from 'uuid';

const collectionUsers: CollectionUsers = new CollectionUsers();

class UserController {
	private readonly req: IncomingMessage;
	private res: ServerResponse;

	constructor(req: IncomingMessage, res: ServerResponse) {
		this.req = req;
		this.res = res;
	}

	async getAllUsers(): Promise<void> {
		this.res.statusCode = 200;
		const users = JSON.stringify(collectionUsers.getAll());
		this.res.end(users);
	}

	async getOneUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const user = await collectionUsers.getOne(userId);
			if (user) {
				this.res.statusCode = 200;
				this.res.end(JSON.stringify(user));
			} else {
				this.res.statusCode = 404;
				this.res.end(`This record doesn't exist!`);
			}
		} else {
			this.res.statusCode = 400;
			this.res.end(`UserId isn't valid (not uuid)!`);
		}
	}

	async createUser(): Promise<void> {
		const body = JSON.parse(await getPostData(this.req));
		if (validateBodyData(body)) {
			this.res.statusCode = 201;
			const newUser = JSON.stringify(await collectionUsers.create(body));
			this.res.end(newUser);
		} else {
			this.res.statusCode = 400;
			this.res.end('body does not contain required fields');
		}
	}

	async updateUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const body = JSON.parse(await getPostData(this.req));
			const user = await collectionUsers.update(userId, body);
			if (user) {
				this.res.statusCode = 200;
				this.res.end(JSON.stringify(user));
			} else {
				this.res.statusCode = 404;
				this.res.end(`This record doesn't exist!`);
			}
		} else {
			this.res.statusCode = 400;
			this.res.end(`UserId isn't valid (not uuid)!`);
		}
	}

	async deleteUser(userId: string): Promise<void> {
		if (validate(userId)) {
			const confirmDelete = collectionUsers.delete(userId);
			if (confirmDelete) {
				this.res.end('The record is found and deleted!');
				this.res.statusCode = 204;
			} else {
				this.res.statusCode = 404;
				this.res.end(`This record doesn't exist!`);
			}
		} else {
			this.res.statusCode = 400;
			this.res.end(`UserId isn't valid (not uuid)!`);
		}
	}
}

export default UserController;
