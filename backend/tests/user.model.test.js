import mongoose from 'mongoose';
import User from '../modules/user/user.model.js';
import { hashPassword } from '../utils/hash.js';

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/my-music-space-test');
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('User Creation', () => {
        it('should create a user with valid data', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);

            expect(user).toBeDefined();
            expect(user._id).toBeDefined();
            expect(user.name).toBe(userData.name);
            expect(user.email).toBe(userData.email);
            expect(user.createdAt).toBeDefined();
            expect(user.updatedAt).toBeDefined();
        });

        it('should fail without required name', async () => {
            const userData = {
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should fail without required email', async () => {
            const userData = {
                name: 'John Doe',
                password: await hashPassword('Password123')
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should enforce unique email', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            await User.create(userData);

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should trim name and email', async () => {
            const userData = {
                name: '  John Doe  ',
                email: '  john@example.com  ',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);

            expect(user.name).toBe('John Doe');
            expect(user.email).toBe('john@example.com');
        });

        it('should convert email to lowercase', async () => {
            const userData = {
                name: 'John Doe',
                email: 'John@Example.COM',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);

            expect(user.email).toBe('john@example.com');
        });

        it('should not select password by default', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);
            const foundUser = await User.findById(user._id);

            expect(foundUser.password).toBeUndefined();
        });

        it('should select password when explicitly requested', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);
            const foundUser = await User.findById(user._id).select('+password');

            expect(foundUser.password).toBeDefined();
        });
    });

    describe('Google OAuth Fields', () => {
        it('should create user with Google OAuth data', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@gmail.com',
                googleId: '1234567890',
                picture: 'https://example.com/photo.jpg',
                authProvider: 'google'
            };

            const user = await User.create(userData);

            expect(user.googleId).toBe(userData.googleId);
            expect(user.picture).toBe(userData.picture);
            expect(user.authProvider).toBe('google');
        });

        it('should allow user without password for OAuth', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@gmail.com',
                googleId: '1234567890',
                authProvider: 'google'
            };

            const user = await User.create(userData);

            expect(user).toBeDefined();
            expect(user.password).toBeUndefined();
        });

        it('should enforce unique googleId', async () => {
            const userData1 = {
                name: 'John Doe',
                email: 'john@gmail.com',
                googleId: '1234567890'
            };

            const userData2 = {
                name: 'Jane Doe',
                email: 'jane@gmail.com',
                googleId: '1234567890'
            };

            await User.create(userData1);
            await expect(User.create(userData2)).rejects.toThrow();
        });

        it('should default authProvider to local', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);

            expect(user.authProvider).toBe('local');
        });
    });

    describe('Timestamps', () => {
        it('should have createdAt and updatedAt', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);

            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.updatedAt).toBeInstanceOf(Date);
        });

        it('should update updatedAt on modification', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: await hashPassword('Password123')
            };

            const user = await User.create(userData);
            const originalUpdatedAt = user.updatedAt;

            // Wait a bit
            await new Promise(resolve => setTimeout(resolve, 100));

            user.name = 'Jane Doe';
            await user.save();

            expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
        });
    });
});
