import { IncomingMessage, ServerResponse } from 'http';
import { parseUrl } from './helpers/parseUrl';
import { MESSAGE } from './dictionary';
import UserController from './controllers/user.controller';

export const Router = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
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
		}
	} else {
		res.statusCode = 404;
		res.statusMessage = MESSAGE.PAGE404;
		res.end(`This page doesn't exist!`);
	}
};
