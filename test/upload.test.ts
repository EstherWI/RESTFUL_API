import request from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';

describe('CSV Upload Test', () => {
  it('should upload a CSV file - file is provided', async () => {
    const response = await request(app)
      .post('/api/files')
      .attach('file', 'test/csv/file.csv'); 
    expect(response.status).to.equal(200);
  });
  it('should not upload a CSV file - no file provided', async () => {
    const response = await request(app)
      .post('/api/files')
      .attach('file', ''); 
    expect(response.status).to.equal(400);
  });
});
