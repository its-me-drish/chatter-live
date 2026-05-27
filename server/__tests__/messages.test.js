import request from 'supertest';
import app from '../index.js';

describe('messages', () => {
  it('requires authentication', async () => {
    const res = await request(app).get('/api/messages');
    expect(res.status).toBe(401);
  });

  it('rejects an invalid token', async () => {
    const res = await request(app).get('/api/messages').set('Authorization', 'Bearer nope');
    expect(res.status).toBe(401);
  });
});
