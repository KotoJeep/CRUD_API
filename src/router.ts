import { IncomingMessage, ServerResponse } from 'http';
import { parseUrl } from './helpers/parseUrl';
import { MESSAGE } from './dictionary';

export const Router = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	const urlArgs = parseUrl(req.url);
	const [api, users, userId, ...args] = urlArgs;
	console.log(urlArgs);
	if (api === 'api' && users === 'users') {
		switch (req.method) {
			case 'GET':
				userId ? res.end(`GET 1 user with id: ${userId}`) : res.end(`GET all users`);
				// res.end(urlArgs);
				res.statusCode = 200;
				break;
			case 'POST':
				res.statusCode = 200;
				res.end('POST');
				break;
			case 'PUT':
				if (userId) {
					res.statusCode = 200;
					console.log(userId);
					res.end(`PUT 1 user with id: ${userId}`);
				}
				break;
			case 'DELETE':
				if (userId) {
					res.statusCode = 200;
					res.end(`POST 1 user with id: ${userId}`);
				}
				break;
		}
	} else {
		res.statusCode = 404;
		res.statusMessage = MESSAGE.PAGE404;
		res.end();
	}
};
