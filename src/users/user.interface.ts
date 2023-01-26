export interface IPostUserData {
	username: string;
	age: number;
	hobbies: string[];
}

export interface IUser extends IPostUserData {
	id: string;
}
