const request = require('supertest');
jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));
const jwt = require('jsonwebtoken');

const app = require('../app');

beforeEach(() => {
  jest.clearAllMocks();
  process.env.TOKEN_SECRET = 'test-secret';
});

test('GET /api/private sin token -> 401', async () => {
  const res = await request(app).get('/api/private');
  expect(res.status).toBe(401);
  expect(res.text).toMatch(/Acceso denegado/);
});

test('GET /api/private con token inválido -> 400', async () => {
  jwt.verify.mockImplementation(() => { throw new Error('invalid'); });
  const res = await request(app).get('/api/private').set('auth-token', 'badtoken');
  expect(res.status).toBe(400);
  expect(res.text).toMatch(/Token inválido/);
});

test('GET /api/private con token válido -> 200', async () => {
  jwt.verify.mockReturnValue({ _id: 'user-123' });
  const res = await request(app).get('/api/private').set('auth-token', 'validtoken');
  expect(res.status).toBe(200);
  expect(res.body.userId).toBe('user-123');
  expect(res.body.message).toBe('Contenido protegido');
});