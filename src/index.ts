import http from 'http';
import 'dotenv/config';
import { Router } from './router';

const PORT = process.env.PORT || 8000;

const server = http.createServer(Router);

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});
