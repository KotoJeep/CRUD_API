export const parseUrl = (url: string | undefined): Array<string> => {
	if (url) {
		return url.split('/').splice(1);
	} else {
		return [''];
	}
};
