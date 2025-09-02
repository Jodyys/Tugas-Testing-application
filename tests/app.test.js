import request from 'supertest';
import app from '../src/app.js';
import { resetStore } from '../src/store.js';

beforeEach(() => resetStore());

test('GET / should return health', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.body.service).toBe('notes-app');
});

test('POST /notes should create note', async () => {
  const res = await request(app)
    .post('/notes')
    .send({ title: 'A', body: 'B' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

// ... test lain sama juga

