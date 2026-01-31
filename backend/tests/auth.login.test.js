import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../modules/user/user.model.js';
import { hashPassword } from '../utils/hash.js';

describe('Auth API - Login', () => {
    let testUser;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/my-music-space-test');
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        
        // Create a test user
        const hashedPassword = await hashPassword('Password123');
        testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should login with valid credentials', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.data).toHaveProperty('accessToken');
            expect(response.body.data).toHaveProperty('user');
            expect(response.body.data.user.email).toBe(loginData.email);
            expect(response.body.data.user).not.toHaveProperty('password');
        });

        it('should fail with missing email', async () => {
            const loginData = {
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with missing password', async () => {
            const loginData = {
                email: 'test@example.com'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with invalid email format', async () => {
            const loginData = {
                email: 'invalid-email',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with non-existent email', async () => {
            const loginData = {
                email: 'nonexistent@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should fail with incorrect password', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'WrongPassword123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should handle email case-insensitivity', async () => {
            const loginData = {
                email: 'TEST@EXAMPLE.COM',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body.success).toBe(true);
        });

        it('should trim whitespace from email', async () => {
            const loginData = {
                email: '  test@example.com  ',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body.success).toBe(true);
        });

        it('should return valid JWT token', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(200);

            const token = response.body.data.accessToken;
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.').length).toBe(3); // JWT has 3 parts
        });

        it('should include user data in response', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'Password123'
            };

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send(loginData)
                .expect(200);

            const user = response.body.data.user;
            expect(user).toHaveProperty('_id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('createdAt');
            expect(user).toHaveProperty('updatedAt');
            expect(user).not.toHaveProperty('password');
        });
    });
});
