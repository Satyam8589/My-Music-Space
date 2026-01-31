import { hashPassword, comparePassword } from '../utils/hash.js';

describe('Password Hashing Utilities', () => {
    describe('hashPassword', () => {
        it('should hash a password', async () => {
            const password = 'TestPassword123';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).not.toBe(password);
            expect(hash.length).toBeGreaterThan(0);
        });

        it('should generate different hashes for same password', async () => {
            const password = 'TestPassword123';
            const hash1 = await hashPassword(password);
            const hash2 = await hashPassword(password);

            expect(hash1).not.toBe(hash2);
        });

        it('should handle empty string', async () => {
            const password = '';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
        });

        it('should handle special characters', async () => {
            const password = 'P@ssw0rd!#$%';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
        });

        it('should handle long passwords', async () => {
            const password = 'A'.repeat(100) + '1aB';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
        });
    });

    describe('comparePassword', () => {
        it('should return true for matching password', async () => {
            const password = 'TestPassword123';
            const hash = await hashPassword(password);
            const isMatch = await comparePassword(password, hash);

            expect(isMatch).toBe(true);
        });

        it('should return false for non-matching password', async () => {
            const password = 'TestPassword123';
            const wrongPassword = 'WrongPassword123';
            const hash = await hashPassword(password);
            const isMatch = await comparePassword(wrongPassword, hash);

            expect(isMatch).toBe(false);
        });

        it('should be case-sensitive', async () => {
            const password = 'TestPassword123';
            const hash = await hashPassword(password);
            const isMatch = await comparePassword('testpassword123', hash);

            expect(isMatch).toBe(false);
        });

        it('should handle special characters correctly', async () => {
            const password = 'P@ssw0rd!#$%';
            const hash = await hashPassword(password);
            const isMatch = await comparePassword(password, hash);

            expect(isMatch).toBe(true);
        });

        it('should return false for empty password against hash', async () => {
            const password = 'TestPassword123';
            const hash = await hashPassword(password);
            const isMatch = await comparePassword('', hash);

            expect(isMatch).toBe(false);
        });
    });
});
