interface IExpectedBodyData {
	username?: string;
	age?: number;
	hobbies?: string[];
}

export const validateBodyData = (postBody: IExpectedBodyData): boolean => {
	return 'username' in postBody && 'age' in postBody && 'hobbies' in postBody;
};
