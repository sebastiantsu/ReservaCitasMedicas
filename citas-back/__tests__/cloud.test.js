const request = require('supertest');

jest.mock('../services/cloudService', () => ({
  upload: jest.fn(),
}));

const cloudService = require('../services/cloudService');
const app = require('../app');

beforeEach(() => jest.clearAllMocks());

test('POST /api/upload -> error del servicio cloud responde 500', async () => {
  cloudService.upload.mockRejectedValue(new Error('Cloud down'));
  const res = await request(app).post('/api/upload'); // no file -> upload lanza o la mock lanza
  expect(res.status).toBe(500);
  expect(res.body.error).toBe('Error subiendo archivo');
  expect(res.body.details).toBe('Cloud down');
});

test('POST /api/upload -> éxito devuelve url', async () => {
  cloudService.upload.mockResolvedValue({ url: 'https://cloud.example.com/foo.png' });
  // supertest no añade req.file fácilmente, pero el route solo pasa req.file a cloudService.upload.
  // Como nuestra mock no importa file, basta con llamar
  const res = await request(app).post('/api/upload').send({}); 
  expect(res.status).toBe(200);
  expect(res.body.url).toBe('https://cloud.example.com/foo.png');
});