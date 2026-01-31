import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../modules/user/user.model.js';

describe('Auth API - Registration', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/my-music-space-test');
    });

    afterAll(async () => {
        // Clean up and close connection
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear users before each test
        await User.deleteMany({});
    });

    describe('POST /api/v1/auth/register', () => {
        it('should register a new user with valid data', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.data).toHaveProperty('_id');
            expect(response.body.data.name).toBe(userData.name);
            expect(response.body.data.email).toBe(userData.email);
            expect(response.body.data).not.toHaveProperty('password');
        });

        it('should fail with missing name', async () => {
            const userData = {
                email: 'john@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('required');
        });

        it('should fail with missing email', async () => {
            const userData = {
                name: 'John Doe',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with missing password', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with invalid email format', async () => {
            const userData = {
                name: 'John Doe',
                email: 'invalid-email',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('email');
        });

        it('should fail with weak password (no uppercase)', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Password');
        });

        it('should fail with weak password (no lowercase)', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'PASSWORD123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with weak password (no number)', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'PasswordABC'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with password less than 8 characters', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Pass12'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with duplicate email', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123'
            };

            // Register first user
            await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(201);

            // Try to register with same email
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('already exists');
        });

        it('should trim whitespace from name and email', async () => {
            const userData = {
                name: '  John Doe  ',
                email: '  john@example.com  ',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.data.name).toBe('John Doe');
            expect(response.body.data.email).toBe('john@example.com');
        });

        it('should convert email to lowercase', async () => {
            const userData = {
                name: 'John Doe',
                email: 'John@Example.COM',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.data.email).toBe('john@example.com');
        });
    });
});
