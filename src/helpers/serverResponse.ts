import { ServerResponse } from 'http';

export class ResponseFromServer {
	private res: ServerResponse;

	constructor(res: ServerResponse) {
		this.res = res;
	}

	success(response: string): void {
		this.res.writeHead(200, { 'Content-Type': 'application/json' });
		this.res.end(response);
	}

	notFound(response: string): void {
		this.res.writeHead(404, { 'Content-Type': 'application/json' });
		this.res.end(response);
	}

	notValid(response: string): void {
		this.res.writeHead(400, { 'Content-Type': 'application/json' });
		this.res.end(response);
	}
}
