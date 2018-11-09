import test from 'ava';
import request from 'supertest';
import app from '../../../server';

test('/api/status should be ok in all cases', async (t) => {
  const res = await request(app)
    .get('/api/status')
    .expect('Content-Type', /json/)
    .expect(200);
  const { body } = res;
  t.is(body.status, 0);
});

test('request to /api/protected should fail with 401 if no token provided', async (t) => {
  const res = await request(app)
    .get('/api/protected')
    .expect(401);
  // should have some error message
  t.truthy(res.body);
});
