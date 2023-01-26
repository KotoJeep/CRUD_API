import { ServerResponse } from 'http';

export class ResponseFromServer {
	private res: ServerResponse;

	constructor(res: ServerResponse) {
		this.res = res;
	}

	success(responseMessage: string): void {
		this.res.writeHead(200, { 'Content-Type': 'application/json' });
		this.res.end(responseMessage);
	}

	notFound(responseMessage: string): void {
		this.res.writeHead(404, { 'Content-Type': 'application/json' });
		this.res.end(responseMessage);
	}

	notValid(responseMessage: string): void {
		this.res.writeHead(400, { 'Content-Type': 'application/json' });
		this.res.end(responseMessage);
	}
}
