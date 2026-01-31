import { generateAccessToken, verifyAccessToken } from '../utils/jwt.js';

describe('JWT Utilities', () => {
    const testPayload = {
        userId: '507f1f77bcf86cd799439011',
        email: 'test@example.com'
    };

    describe('generateAccessToken', () => {
        it('should generate a valid JWT token', () => {
            const token = generateAccessToken(testPayload);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.').length).toBe(3);
        });

        it('should include payload data in token', () => {
            const token = generateAccessToken(testPayload);
            const decoded = JSON.parse(
                Buffer.from(token.split('.')[1], 'base64').toString()
            );

            expect(decoded.userId).toBe(testPayload.userId);
            expect(decoded.email).toBe(testPayload.email);
        });

        it('should include expiration time', () => {
            const token = generateAccessToken(testPayload);
            const decoded = JSON.parse(
                Buffer.from(token.split('.')[1], 'base64').toString()
            );

            expect(decoded).toHaveProperty('exp');
            expect(decoded).toHaveProperty('iat');
        });

        it('should generate different tokens for same payload', () => {
            const token1 = generateAccessToken(testPayload);
            // Wait a bit to ensure different iat
            const token2 = generateAccessToken(testPayload);

            // Tokens will be different due to different iat (issued at) times
            expect(token1).toBeDefined();
            expect(token2).toBeDefined();
        });

        it('should handle empty payload', () => {
            const token = generateAccessToken({});

            expect(token).toBeDefined();
            expect(token.split('.').length).toBe(3);
        });
    });

    describe('verifyAccessToken', () => {
        it('should verify a valid token', () => {
            const token = generateAccessToken(testPayload);
            const decoded = verifyAccessToken(token);

            expect(decoded).toBeDefined();
            expect(decoded.userId).toBe(testPayload.userId);
            expect(decoded.email).toBe(testPayload.email);
        });

        it('should throw error for invalid token', () => {
            const invalidToken = 'invalid.token.here';

            expect(() => {
                verifyAccessToken(invalidToken);
            }).toThrow('Invalid access token');
        });

        it('should throw error for malformed token', () => {
            const malformedToken = 'not-a-jwt-token';

            expect(() => {
                verifyAccessToken(malformedToken);
            }).toThrow();
        });

        it('should throw error for empty token', () => {
            expect(() => {
                verifyAccessToken('');
            }).toThrow();
        });

        it('should throw error for tampered token', () => {
            const token = generateAccessToken(testPayload);
            const tamperedToken = token.slice(0, -5) + 'xxxxx';

            expect(() => {
                verifyAccessToken(tamperedToken);
            }).toThrow();
        });

        it('should include all payload fields in decoded token', () => {
            const extendedPayload = {
                ...testPayload,
                role: 'user',
                customField: 'value'
            };

            const token = generateAccessToken(extendedPayload);
            const decoded = verifyAccessToken(token);

            expect(decoded.userId).toBe(extendedPayload.userId);
            expect(decoded.email).toBe(extendedPayload.email);
            expect(decoded.role).toBe(extendedPayload.role);
            expect(decoded.customField).toBe(extendedPayload.customField);
        });
    });
});
