import { IPostUserData, IUser } from './user.interface';
import { v4 as uuidv4, validate } from 'uuid';

export class CollectionUsers {
	collectionUsers: IUser[] = [];

	create(user: IUser): IPostUserData {
		const id = uuidv4();
		const newUser = { ...user, id };
		this.collectionUsers.push(newUser);
		return newUser;
	}

	getAll(): IUser[] {
		return this.collectionUsers;
	}

	getOne(id: string): IUser | undefined {
		const userId = this.findIndexUser(id);
		if (userId > -1) {
			return this.collectionUsers[userId];
		}
		return undefined;
	}

	update(id: string, user: IUser): IUser | undefined {
		const idxUserId = this.findIndexUser(id);
		if (idxUserId) {
			this.collectionUsers[idxUserId] = user;
		}
		return undefined;
	}

	delete(id: string): boolean {
		const idxUserId = this.findIndexUser(id);
		if (idxUserId) {
			this.collectionUsers = [
				...this.collectionUsers.slice(0, idxUserId),
				...this.collectionUsers.slice(idxUserId + 1),
			];
			return true;
		}
		return false;
	}

	private findIndexUser(id: string): number {
		return this.collectionUsers.findIndex((el) => el.id === id);
	}
}
