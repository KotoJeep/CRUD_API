import { IncomingMessage, ServerResponse } from 'http';
import { parseUrl } from './helpers/parseUrl';
import { MESSAGE } from './dictionary';
import UserController from './controllers/user.controller';
import { HttpError } from './errors/httpError';

export const Router = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	try {
		const urlArgs = parseUrl(req.url);
		const [api, users, userId, ...args] = urlArgs;
		const controller = new UserController(req, res);

		if (api === 'api' && users === 'users') {
			switch (req.method) {
				case 'GET':
					userId ? await controller.getOneUser(userId) : await controller.getAllUsers();
					break;
				case 'POST':
					await controller.createUser();
					break;
				case 'PUT':
					await controller.updateUser(userId);
					break;
				case 'DELETE':
					await controller.deleteUser(userId);
					break;
				default:
					res.writeHead(405, { 'Content-Type': 'application/json' });
					res.end(`Error: ${MESSAGE.METHOD_NOT_SUPPORTED}`);
			}
		} else {
			res.statusCode = 404;
			res.statusMessage = MESSAGE.PAGE404;
			res.end(`This page doesn't exist!`);
		}
	} catch (err: HttpError | any) {
		res.writeHead(500);
		res.end(`Error: ${err.message}`);
	}
};
