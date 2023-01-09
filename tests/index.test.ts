import http from 'http';
import { Router } from '../src/router';
import { IPostUserData, IUser } from '../src/users/user.interface';
import request from 'supertest';

describe('Api queries', () => {
	const server = http.createServer(Router);
	server.listen(process.env.port || 9000);

	const user: IPostUserData = {
		username: 'oleg',
		age: 33,
		hobbies: ['dsf'],
	};
	const userForUpdate = {
		username: 'Anton',
		age: 33,
		hobbies: ['dsf'],
	};
	afterEach(async () => {
		await server.close();
	});

	test('POST user', async () => {
		const res = await request(server).post('/api/users').send(user);
		expect(res.statusCode).toBe(201);
		expect(res.body.username).toEqual(user.username);
		expect(res.body.age).toEqual(user.age);
		expect(res.body.hobbies).toEqual(user.hobbies);
		const res2 = await request(server).post('/api/users').send(user);
		const res3 = await request(server).post('/api/users').send(user);
	});

	test('GET user', async () => {
		const res = await request(server).post('/api/users').send(user);
		const id = res.body.id;
		const resGet = await request(server).get(`/api/users/${id}`);
		expect(resGet.statusCode).toBe(200);
		expect(resGet.body).toEqual({ ...user, id });
	});

	test('UPDATE  user', async () => {
		const res = await request(server).post('/api/users').send(user);
		const id = res.body.id;
		const resUpd = await request(server).put(`/api/users/${id}`).send(userForUpdate);
		expect(resUpd.body.username).toEqual(userForUpdate.username);
	});
});
