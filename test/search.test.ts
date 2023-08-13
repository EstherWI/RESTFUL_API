import request from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';
import { populateDatabase } from '../src/populate';

before(async () => {
    await populateDatabase(); 
});

describe('User Search Test', () => {
    it('Should found John in database', async () => {
        const searchQuery = 'John';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('CASE INSENSITIVE: Should found john doe in database', async () => {
        const searchQuery = 'john doe';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('CASE INSENSITIVE: Should not found alice in database', async () => {
        const searchQuery = 'alice';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(404);
    });
    it('CASE INSENSITIVE: Should found users who lives in paris in database', async () => {
        const searchQuery = 'paris';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('CASE INSENSITIVE: Should found users who likes football in database', async () => {
        const searchQuery = 'football';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('PARTIAL MATCH: Search "foot"', async () => {
        const searchQuery = 'foot';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('PARTIAL MATCH: Search "par"', async () => {
        const searchQuery = 'par';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('Should found users who lives in USA in database', async () => {
        const searchQuery = 'USA';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
    it('CASE INSENSITIVE: Should found users who lives in usa in database', async () => {
        const searchQuery = 'usa';
        const response = await request(app).get(`/api/users?q=${searchQuery}`);
        expect(response.status).to.equal(200);
    });
});

