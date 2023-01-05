export const parseUrl = (url: string | undefined): Array<string> => {
	if (url) {
		return url.split('/').filter((el) => el !== '');
		// return [...args.slice(0, 6), ...args.slice(7)];
	} else {
		return [''];
	}
};
