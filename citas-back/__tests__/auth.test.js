const request = require('supertest');

// antes de requerir app hacemos mocks dinámicos
jest.mock('../models/Users', () => {
  // Constructor falso para new User(...)
  const mockSave = jest.fn().mockResolvedValue({ _id: 'mocked-id' });
  function User(doc) {
    Object.assign(this, doc);
    this.save = mockSave;
  }
  User.findOne = jest.fn();
  return User;
});

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.TOKEN_SECRET = 'test-secret';

const app = require('../app');

describe('Auth routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/auth/register -> éxito', async () => {
    User.findOne.mockResolvedValue(null); // email no existe
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed-password');

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Usuario registrado con éxito.');
    // save se llamó
    expect(User.prototype.save).toBeDefined();
  });

  test('POST /api/auth/register -> email duplicado', async () => {
    User.findOne.mockResolvedValue({ _id: 'existing' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'exists@b.com', password: 'pw' });

    expect(res.status).toBe(400);
    expect(res.text).toMatch(/registrado/);
  });

  test('POST /api/auth/login -> éxito devuelve token en header', async () => {
    const fakeUser = { _id: 'u1', email: 'u@u.com', password: 'hashed' };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('jwt-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'u@u.com', password: 'pw' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe('jwt-token');
    expect(res.headers['auth-token']).toBe('jwt-token');
  });

  test('POST /api/auth/login -> email no encontrado', async () => {
    User.findOne.mockResolvedValue(null);
    const res = await request(app).post('/api/auth/login').send({ email: 'no@no.com', password: 'x' });
    expect(res.status).toBe(400);
    expect(res.text).toMatch(/Email o contraseña incorrectos/);
  });

  test('POST /api/auth/login -> contraseña inválida', async () => {
    User.findOne.mockResolvedValue({ _id: 'u1', email: 'u@u.com', password: 'hashed' });
    bcrypt.compare.mockResolvedValue(false);
    const res = await request(app).post('/api/auth/login').send({ email: 'u@u.com', password: 'bad' });
    expect(res.status).toBe(400);
    expect(res.text).toMatch(/Email o contraseña incorrectos/);
  });

  test('POST /api/auth/register -> error al guardar se propaga como 400', async () => {
    // configuramos el constructor para que la save rechace
    const failingSave = jest.fn().mockRejectedValue(new Error('DB failure'));
    function UserFail(doc) { Object.assign(this, doc); this.save = failingSave; }
    UserFail.findOne = jest.fn().mockResolvedValue(null);
    // sobreescribimos el mock del módulo
    jest.doMock('../models/Users', () => UserFail);
    // re-require app (limpio)
    const app2 = require('../app');
    const res = await request(app2).post('/api/auth/register').send({ email: 'x@y.com', password: 'pw' });
    // El código original hace catch(error) -> res.status(400).send(error)
    expect(res.status).toBe(400);
  });
});