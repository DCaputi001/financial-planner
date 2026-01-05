# Financial Planner

> A secure, full-stack financial planning application with multi-factor authentication and intelligent savings optimization

[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/DCaputi001/financial-planner)
[![Project Page](https://img.shields.io/badge/project-page-green)](https://dcaputi001.github.io/projects/capstone.html)

## Overview

Financial Planner is a comprehensive web application that transforms a simple C++ command-line investment calculator into an enterprise-grade financial planning tool. This project demonstrates the evolution from basic console-based calculations to a secure, scalable full-stack application with advanced features including multi-factor authentication, intelligent savings goal optimization, and user-specific data persistence.

**Why This Project Matters:**

This application addresses real-world financial planning needs while implementing industry-standard security practices and modern software architecture. It showcases the integration of secure coding principles, algorithmic optimization, and database design to create a production-ready solution for personal financial management.

🔗 **[View Live Demo](#)** | **[Read Full Project Documentation](https://dcaputi001.github.io/projects/capstone.html)**

## Table of Contents

- [Technical Architecture](#technical-architecture)
- [Features and Enhancements](#features-and-enhancements)
- [Installation and Setup](#installation-and-setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Security Practices](#security-practices)
- [Development and Code Quality](#development-and-code-quality)
- [Academic Context](#academic-context)
- [Future Enhancements](#future-enhancements)
- [License and Contact](#license-and-contact)

## Technical Architecture

### Tech Stack

**Frontend:**
- Angular (Standalone Components)
- TypeScript
- Two-way data binding
- Responsive design

**Backend:**
- Node.js
- Express.js framework
- RESTful API architecture
- JWT-based authentication

**Database:**
- MongoDB
- Mongoose ODM with schema validation
- User-isolated data storage

**Security:**
- TOTP-based Multi-Factor Authentication
- HMAC-SHA1 cryptographic hashing
- BASE32 encoding
- Constant-time comparison algorithms

### Project Structure

```
financial-planner/
├── backend/
│   ├── controllers/       # Request handlers and business logic
│   ├── routes/           # API endpoint definitions
│   ├── services/         # Core services (MFA, calculations)
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Authentication and validation
│   └── config/           # Configuration files
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   ├── services/     # API integration services
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── guards/       # Route protection
│   │   └── assets/           # Static resources
│   └── angular.json
│
└── README.md
```

### Architecture Flow

```
┌─────────────┐
│   Angular   │  ←→  User Interaction
│   Frontend  │
└──────┬──────┘
       │ HTTP/REST
       │
┌──────▼──────┐
│   Express   │  ←→  Authentication & Routing
│   Backend   │
└──────┬──────┘
       │ Mongoose
       │
┌──────▼──────┐
│   MongoDB   │  ←→  Data Persistence
│   Database  │
└─────────────┘
```

## Features and Enhancements

This project represents three major enhancement categories, each demonstrating distinct computer science competencies:

### 🔧 Software Engineering Enhancement

**Transformation:** C++ Console Calculator → Full-Stack Web Application

Key improvements:
- **Modular Architecture**: Separation of concerns across controllers, routes, and services
- **Layered Validation**: Input validation on both frontend and backend layers
- **Structured Error Handling**: Secure error responses without exposing internal implementation
- **Code Quality**: Replaced magic numbers with named constants and improved maintainability
- **Scalable Design**: RESTful API architecture supporting future feature expansion

**Impact**: Evolved from a single-purpose calculator to a comprehensive financial planning platform accessible from any device.

### 📊 Algorithms & Data Structures Enhancement

#### Multi-Factor Authentication (MFA)

Implements time-based one-time password (TOTP) authentication:
- **Cryptographic Hashing**: HMAC-SHA1 for secure token generation
- **BASE32 Encoding**: Standard-compliant secret key encoding
- **Constant-Time Comparison**: Protection against timing attacks
- **30-Second Window**: Standard TOTP interval with clock drift tolerance

**Algorithm Complexity**: O(1) for verification, ensuring consistent performance regardless of user base size.

#### Savings Goal Optimizer

Intelligent calculation of required monthly deposits:
- **Binary Search Algorithm**: Efficiently finds minimum monthly deposit amount
- **Complexity Reduction**: O(log n) instead of O(n) linear search
- **Precision Handling**: Accurate calculations with floating-point considerations
- **Goal Tracking**: Persistent storage of user-defined financial goals

**Performance Benefit**: Reduces computation time from seconds to milliseconds for complex goal calculations.

### 🗄️ Database Enhancement

**MongoDB Integration** with comprehensive security:

- **Mongoose Schema Validation**: Structured data with type enforcement
- **User Authentication**: Secure user registration and login flows
- **Authorization Controls**: Token-based access with verification middleware
- **Data Isolation**: User-specific data queries ensuring privacy
- **CRUD Operations**: Complete create, read, update, delete functionality

**Data Model**:
```javascript
User Schema:
- username (unique, required)
- email (validated, required)
- password (hashed, required)
- mfaSecret (encrypted)
- createdAt (timestamp)

Goal Schema:
- userId (reference to User)
- goalName (required)
- targetAmount (validated)
- currentAmount (default: 0)
- targetDate (date)
- monthlyDeposit (calculated)
```

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.x or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v4.x or higher) - either local installation or MongoDB Atlas account
- **Git** for cloning the repository

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/DCaputi001/financial-planner.git
cd financial-planner
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env
```

**Configure Environment Variables** (backend/.env):

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/financial-planner
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/financial-planner

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# MFA Configuration
MFA_ISSUER=Financial Planner
MFA_LABEL=FinancialPlanner

# CORS
CORS_ORIGIN=http://localhost:4200
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp src/environments/environment.example.ts src/environments/environment.ts
```

**Configure Environment Variables** (frontend/src/environments/environment.ts):

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Financial Planner'
};
```

#### 4. Database Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
# Or start MongoDB service on Windows

# Verify MongoDB is running
mongo --eval "db.version()"
```

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Copy the connection string and update `MONGODB_URI` in backend/.env

#### 5. Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev  # Starts on http://localhost:3000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start  # Starts on http://localhost:4200
```

#### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

### Quick Start with Sample Data

For development and testing, you can seed the database with sample data:

```bash
cd backend
npm run seed  # Creates sample users and goals
```

**Default Test Account:**
- Username: `demo@example.com`
- Password: `Demo123!`

## Usage Guide

### Getting Started

1. **Create an Account**
   - Navigate to the registration page
   - Enter your email, username, and password
   - Password requirements: minimum 8 characters, one uppercase, one number

2. **Enable Multi-Factor Authentication**
   - After registration, navigate to Security Settings
   - Scan the QR code with an authenticator app (Google Authenticator, Authy, etc.)
   - Enter the 6-digit code to verify setup

3. **Login**
   - Enter your credentials
   - Provide the MFA code from your authenticator app
   - Access granted upon successful verification

### Key Features

#### Investment Calculator

Calculate future investment value with compound interest:

```
Initial Investment: $10,000
Monthly Contribution: $500
Annual Interest Rate: 7%
Investment Period: 10 years

Result: Projected final value with breakdown of principal vs. earnings
```

#### Savings Goal Optimizer

Create and track financial goals:

1. Define your goal (e.g., "Emergency Fund")
2. Set target amount ($10,000)
3. Set target date
4. System calculates required monthly deposit using binary search optimization
5. Track progress with visual indicators

#### Dashboard

- View all active financial goals
- Monitor progress towards targets
- Adjust contributions as needed
- View historical performance

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "userId": "60d5ec49f1b2c8b5f8e4a1b2"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "mfaToken": "123456"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c8b5f8e4a1b2",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Setup MFA

```http
POST /api/auth/mfa/setup
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### Goal Management Endpoints

#### Create Goal

```http
POST /api/goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "goalName": "Emergency Fund",
  "targetAmount": 10000,
  "currentAmount": 2000,
  "targetDate": "2025-12-31"
}

Response: 201 Created
{
  "success": true,
  "goal": {
    "id": "60d5ec49f1b2c8b5f8e4a1b3",
    "goalName": "Emergency Fund",
    "targetAmount": 10000,
    "currentAmount": 2000,
    "monthlyDepositRequired": 667.50,
    "targetDate": "2025-12-31"
  }
}
```

#### Get All Goals

```http
GET /api/goals
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "goals": [
    {
      "id": "60d5ec49f1b2c8b5f8e4a1b3",
      "goalName": "Emergency Fund",
      "targetAmount": 10000,
      "currentAmount": 2000,
      "progress": 20,
      "monthlyDepositRequired": 667.50
    }
  ]
}
```

#### Update Goal Progress

```http
PATCH /api/goals/:goalId
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentAmount": 3000
}

Response: 200 OK
{
  "success": true,
  "goal": {
    "id": "60d5ec49f1b2c8b5f8e4a1b3",
    "currentAmount": 3000,
    "progress": 30,
    "monthlyDepositRequired": 584.17
  }
}
```

#### Delete Goal

```http
DELETE /api/goals/:goalId
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Goal deleted successfully"
}
```

### Investment Calculator Endpoint

```http
POST /api/calculator/investment
Authorization: Bearer {token}
Content-Type: application/json

{
  "initialInvestment": 10000,
  "monthlyContribution": 500,
  "annualInterestRate": 7,
  "years": 10
}

Response: 200 OK
{
  "success": true,
  "result": {
    "finalValue": 103245.67,
    "totalPrincipal": 70000,
    "totalEarnings": 33245.67,
    "yearlyBreakdown": [...]
  }
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: MFA verification failed
- `VAL_001`: Validation error
- `DB_001`: Database operation failed

## Security Practices

This application implements comprehensive security measures following industry best practices:

### Authentication and Authorization

**Multi-Factor Authentication (MFA)**:
- TOTP-based (Time-based One-Time Password) implementation
- HMAC-SHA1 cryptographic hashing for token generation
- BASE32 encoding for cross-platform compatibility
- 30-second time windows with drift tolerance
- Constant-time comparison to prevent timing attacks

**JWT Token Security**:
- Secure token generation with cryptographic signatures
- Token expiration and refresh mechanisms
- HTTP-only cookie options for web security
- Token validation on every protected route

**Password Security**:
- bcrypt hashing with salt rounds (cost factor: 10)
- Password complexity requirements enforced
- Protection against rainbow table attacks
- No plaintext password storage

### OWASP Top 10 Protections

1. **Injection Prevention**: Mongoose parameterized queries prevent NoSQL injection
2. **Broken Authentication**: MFA and JWT implementation with secure session management
3. **Sensitive Data Exposure**: Encrypted data transmission, hashed passwords
4. **XML External Entities (XXE)**: JSON-only API, no XML parsing
5. **Broken Access Control**: Middleware verification on all protected routes
6. **Security Misconfiguration**: Environment-based configuration, secure defaults
7. **Cross-Site Scripting (XSS)**: Input sanitization and output encoding
8. **Insecure Deserialization**: Strict data validation with Mongoose schemas
9. **Using Components with Known Vulnerabilities**: Regular dependency updates
10. **Insufficient Logging & Monitoring**: Comprehensive error logging and audit trails

### Data Protection

**User Data Isolation**:
```javascript
// Every database query includes user verification
Goal.find({ userId: authenticatedUserId })
```

**Input Validation**:
- Frontend validation with Angular reactive forms
- Backend validation with Mongoose schemas
- Double validation ensures data integrity
- Sanitization of user inputs

**Secure Communication**:
- HTTPS enforcement in production
- CORS configuration for trusted origins only
- Secure headers with Helmet.js middleware

### Code Security Practices

**Error Handling**:
- Generic error messages to users
- Detailed logging for developers
- No exposure of stack traces or internal paths
- Graceful degradation on failures

**Constants vs. Magic Numbers**:
```javascript
// Before
if (attempts > 3) { /* lock account */ }

// After
const MAX_LOGIN_ATTEMPTS = 3;
if (attempts > MAX_LOGIN_ATTEMPTS) { /* lock account */ }
```

## Development and Code Quality

### Code Review Standards

This project follows rigorous code review practices:

- **CS-499 Code Review Checklist**: Academic standards for code quality
- **OWASP Secure Coding Guidelines**: Security-first development approach
- **SmartBear Peer Review Practices**: Industry-standard review processes
- **Meta Engineering Research**: Efficiency and effectiveness in reviews

### Quality Assurance

**Code Standards**:
- TypeScript strict mode enabled
- ESLint configuration for consistent style
- Prettier for automatic code formatting
- Pre-commit hooks for quality checks

**Validation Layers**:
1. **Frontend Validation**: Immediate user feedback on Angular forms
2. **Backend Validation**: Mongoose schema validation
3. **Business Logic Validation**: Controller-level checks
4. **Database Constraints**: MongoDB unique indexes and required fields

**Error Handling Strategy**:
- Try-catch blocks for asynchronous operations
- Custom error classes for different error types
- Centralized error handling middleware
- Detailed logging with Winston or similar

### Testing Approach

**Recommended Testing Stack** (for future implementation):
- **Unit Tests**: Jest for isolated function testing
- **Integration Tests**: Supertest for API endpoint testing
- **E2E Tests**: Cypress or Playwright for user flow testing
- **Coverage Goals**: Minimum 80% code coverage

### Contributing Guidelines

If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Contribution Standards**:
- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Include tests for new functionality
- Ensure all existing tests pass

## Academic Context

### CS-499 Capstone Project - SNHU

This project represents the culmination of a Computer Science degree at Southern New Hampshire University, demonstrating competency across multiple domains:

**Project Evolution**:
- **Original**: C++ command-line investment calculator
- **Enhanced**: Full-stack web application with enterprise features

**Three Enhancement Categories**:

1. **Software Design and Engineering**
   - Demonstrated ability to design and implement modular, scalable software
   - Showed proficiency in multiple programming languages and paradigms
   - Applied software engineering principles to real-world problems

2. **Algorithms and Data Structures**
   - Implemented efficient algorithms with logarithmic time complexity
   - Applied cryptographic algorithms for security features
   - Optimized data structures for performance

3. **Databases**
   - Designed and implemented normalized database schemas
   - Created secure, user-isolated data storage
   - Implemented CRUD operations with validation

### Learning Outcomes

**Technical Skills Demonstrated**:
- Full-stack development with modern frameworks
- RESTful API design and implementation
- Database design and MongoDB integration
- Cryptographic security implementation
- Algorithm optimization and analysis

**Professional Skills Developed**:
- Code review and quality assurance
- Security-first development mindset
- Documentation and technical communication
- Problem-solving and critical thinking
- Project planning and execution

### Problem Statement

**Original Challenge**: Artemis Financial, a consulting company specializing in financial planning, required a security analysis and enhancement of their existing financial services API. The application needed to demonstrate:
- Secure coding practices
- Industry-standard security implementations
- Scalable architecture
- User authentication and authorization

**Solution Delivered**: A complete refactoring and enhancement that transforms a basic calculator into a production-ready financial planning platform with enterprise-level security, demonstrating practical application of computer science principles.

🔗 **[View Detailed Project Documentation](https://dcaputi001.github.io/projects/capstone.html)**

## Future Enhancements

### Planned Features

**Short-term Improvements**:
- [ ] Email verification during registration
- [ ] Password reset functionality via email
- [ ] Dark mode theme option
- [ ] Mobile-responsive design improvements
- [ ] Goal achievement notifications

**Medium-term Enhancements**:
- [ ] Advanced investment portfolio tracking
- [ ] Integration with real financial market data APIs
- [ ] Budget tracking and expense categorization
- [ ] Financial reports and analytics dashboard
- [ ] Export data to CSV/PDF formats

**Long-term Vision**:
- [ ] Machine learning for personalized financial recommendations
- [ ] Integration with banking APIs (Plaid, Yodlee)
- [ ] Retirement planning calculator with inflation adjustment
- [ ] Tax optimization suggestions
- [ ] Multi-currency support
- [ ] Collaborative family accounts
- [ ] Mobile app (React Native or Flutter)

### Scalability Enhancements

**Infrastructure**:
- Containerization with Docker
- Kubernetes orchestration for scalability
- Redis caching for improved performance
- CDN integration for static assets
- Load balancing for high availability

**Performance Optimization**:
- Database query optimization and indexing
- API response caching strategies
- Lazy loading for frontend components
- Image optimization and compression
- Code splitting and tree shaking

**Security Improvements**:
- Biometric authentication options
- Advanced threat detection and monitoring
- Rate limiting and DDoS protection
- Security audit logging and alerting
- Regular penetration testing

### UI/UX Enhancements

- Interactive data visualizations with D3.js or Chart.js
- Onboarding tutorial for new users
- Contextual help and tooltips
- Accessibility improvements (WCAG compliance)
- Progressive Web App (PWA) capabilities
- Animated transitions and micro-interactions

### Integration Possibilities

- **Financial APIs**: Plaid, Stripe, PayPal
- **Market Data**: Alpha Vantage, Yahoo Finance API
- **Calendar Integration**: Google Calendar, Outlook
- **Cloud Storage**: Google Drive, Dropbox for document storage
- **Communication**: Twilio for SMS alerts, SendGrid for emails

## License and Contact

### License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 DCaputi001

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Author

**DCaputi001**

- GitHub: [@DCaputi001](https://github.com/DCaputi001)
- Portfolio: [https://dcaputi001.github.io](https://dcaputi001.github.io)
- Project Documentation: [Capstone Project Page](https://dcaputi001.github.io/projects/capstone.html)

### Acknowledgments

**Technologies and Frameworks**:
- Angular Team for the excellent frontend framework
- Express.js community for the robust backend framework
- MongoDB team for the flexible database solution
- Node.js contributors for the JavaScript runtime

**Educational Institution**:
- Southern New Hampshire University - CS-499 Capstone Course
- Course instructors and mentors for guidance and feedback

**Resources and Standards**:
- OWASP for secure coding guidelines
- SmartBear for code review best practices
- Meta Engineering for review efficiency research
- RFC 6238 for TOTP algorithm specification

### Project Information

- **Project Type**: CS-499 Capstone Project
- **Institution**: Southern New Hampshire University (SNHU)
- **Completion Date**: November 2025
- **Version**: 1.0.0
- **Status**: Academic Project - Active Development

---

**Thank you for exploring the Financial Planner project!** If you found this project helpful or interesting, please consider giving it a star on GitHub. For questions, suggestions, or collaboration opportunities, feel free to open an issue or reach out through GitHub.

📚 **[Return to Top](#financial-planner)** | 🔗 **[View Repository](https://github.com/DCaputi001/financial-planner)** | 📖 **[Read Full Documentation](https://dcaputi001.github.io/projects/capstone.html)**
