import request from 'supertest';
import app from '../app.js';

describe('Google OAuth Route Sanity Check', () => {
    it('GET /api/v1/auth/google should redirect to Google', async () => {
        const response = await request(app)
            .get('/api/v1/auth/google')
            .expect(302); // Redirect status

        expect(response.header.location).toContain('accounts.google.com');
    });

    it('GET /api/v1/auth/google/callback without valid code should fail/redirect', async () => {
        // Without a valid code from Google, it should fail or redirect
        const response = await request(app)
            .get('/api/v1/auth/google/callback')
            .expect(302); // Redirect back to failure redirect (e.g. /login)
    });
});
