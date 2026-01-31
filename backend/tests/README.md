# Test Suite Documentation

## Overview

Comprehensive test suite for the My Music Space authentication system using Jest and Supertest.

## Test Coverage

### 1. **Authentication Tests**

#### **Registration Tests** (`auth.register.test.js`)
- ✅ Valid user registration
- ✅ Missing required fields (name, email, password)
- ✅ Invalid email format
- ✅ Weak password validation
  - No uppercase letters
  - No lowercase letters
  - No numbers
  - Less than 8 characters
- ✅ Duplicate email prevention
- ✅ Whitespace trimming
- ✅ Email case normalization

**Total: 13 test cases**

#### **Login Tests** (`auth.login.test.js`)
- ✅ Valid login credentials
- ✅ Missing email or password
- ✅ Invalid email format
- ✅ Non-existent user
- ✅ Incorrect password
- ✅ Email case-insensitivity
- ✅ Whitespace handling
- ✅ JWT token generation
- ✅ User data in response

**Total: 10 test cases**

#### **Middleware Tests** (`auth.middleware.test.js`)
- ✅ Token structure validation
- ✅ Token payload verification
- ✅ Token expiration check
- 🔄 Protected route access (placeholder for future routes)

**Total: 3 test cases + 5 placeholders**

### 2. **Utility Tests**

#### **Password Hashing** (`utils.hash.test.js`)
- ✅ Password hashing
- ✅ Unique hashes for same password
- ✅ Empty string handling
- ✅ Special characters
- ✅ Long passwords
- ✅ Password comparison (match)
- ✅ Password comparison (no match)
- ✅ Case sensitivity
- ✅ Special character comparison

**Total: 9 test cases**

#### **JWT Utilities** (`utils.jwt.test.js`)
- ✅ Token generation
- ✅ Payload inclusion
- ✅ Expiration time
- ✅ Token uniqueness
- ✅ Empty payload handling
- ✅ Token verification
- ✅ Invalid token detection
- ✅ Malformed token detection
- ✅ Tampered token detection
- ✅ Extended payload support

**Total: 10 test cases**

### 3. **Model Tests**

#### **User Model** (`user.model.test.js`)
- ✅ User creation with valid data
- ✅ Required field validation
- ✅ Unique email enforcement
- ✅ Field trimming
- ✅ Email lowercase conversion
- ✅ Password field selection
- ✅ Google OAuth fields
- ✅ OAuth without password
- ✅ Unique googleId enforcement
- ✅ Default authProvider
- ✅ Timestamp creation
- ✅ Timestamp updates

**Total: 12 test cases**

---

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test Suites

**Authentication Tests:**
```bash
npm run test:auth
```

**Utility Tests:**
```bash
npm run test:utils
```

**Model Tests:**
```bash
npm run test:model
```

---

## Test Configuration

### Jest Config (`jest.config.js`)
- **Environment:** Node.js
- **Test Pattern:** `**/tests/**/*.test.js`
- **Coverage Directory:** `coverage/`
- **Coverage Includes:**
  - `modules/**/*.js`
  - `middleware/**/*.js`
  - `utils/**/*.js`

### Environment Setup
Tests use a separate test database:
```
mongodb://localhost:27017/my-music-space-test
```

---

## Test Statistics

| Category | Files | Test Cases | Status |
|----------|-------|------------|--------|
| Auth API | 3 | 26 | ✅ |
| Utils | 2 | 19 | ✅ |
| Models | 1 | 12 | ✅ |
| **Total** | **6** | **57** | **✅** |

---

## Coverage Goals

- **Statements:** > 80%
- **Branches:** > 75%
- **Functions:** > 80%
- **Lines:** > 80%

---

## Writing New Tests

### Test File Naming Convention
```
<module>.<feature>.test.js
```

Examples:
- `auth.register.test.js`
- `music.add.test.js`
- `utils.hash.test.js`

### Test Structure
```javascript
import request from 'supertest';
import app from '../app.js';

describe('Feature Name', () => {
    beforeAll(async () => {
        // Setup before all tests
    });

    afterAll(async () => {
        // Cleanup after all tests
    });

    beforeEach(async () => {
        // Setup before each test
    });

    describe('Specific Functionality', () => {
        it('should do something', async () => {
            // Test implementation
            expect(result).toBe(expected);
        });
    });
});
```

---

## Continuous Integration

### Pre-commit Hooks (Recommended)
```bash
npm test
```

### CI/CD Pipeline
1. Run all tests
2. Generate coverage report
3. Fail build if coverage < 80%

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Ensure MongoDB is running:
- Windows: net start MongoDB
- Mac/Linux: sudo systemctl start mongod
```

**2. Port Already in Use**
```
Tests use the app without starting the server,
so port conflicts shouldn't occur.
```

**3. Timeout Errors**
```
Increase Jest timeout in jest.config.js:
testTimeout: 10000
```

---

## Future Test Additions

### Planned Test Suites
- [ ] Music module tests
- [ ] Search module tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance tests
- [ ] Security tests

---

## Best Practices

1. **Isolation:** Each test should be independent
2. **Cleanup:** Always clean up test data
3. **Descriptive:** Use clear test descriptions
4. **Coverage:** Aim for >80% code coverage
5. **Fast:** Keep tests fast (<5s total)
6. **Reliable:** Tests should not be flaky

---

**Last Updated:** 2026-02-01  
**Test Framework:** Jest 30.2.0  
**HTTP Testing:** Supertest 7.2.2
