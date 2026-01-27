# DevTinder Backend API

A Node.js/Express-based backend application for a dating platform similar to Tinder. This API provides user authentication, profile management, and connection request features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Development](#development)

## Features

- **User Authentication**: Email and phone-based signup/login
- **Profile Management**: View and edit user profiles with image support
- **Password Management**: Secure password handling with bcrypt hashing and reset functionality
- **Connection Requests**: Send and review connection requests (like/pass, accept/reject)
- **Email Verification**: Email verification with nodemailer
- **JWT Authentication**: Secure token-based authentication
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Comprehensive input validation using express-validator
- **Password Security**: Strong password requirements with bcrypt

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + Bcrypt
- **Validation**: Express-validator, Validator.js
- **Email Service**: Nodemailer
- **Utilities**: Cookie-parser, CORS, Dotenv
- **Code Quality**: ESLint
- **Development**: Nodemon

## Project Structure

```
dev-tinder/
├── src/
│   ├── config/              # Configuration files
│   │   └── mailer.js       # Email configuration
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.js
│   │   ├── connection.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── profile.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── config.js       # MongoDB connection
│   ├── middlewares/         # Express middlewares
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/              # Mongoose schemas
│   │   ├── user/
│   │   │   └── user.models.js
│   │   └── connectionRequest/
│   │       └── connectionRequest.model.js
│   ├── routes/              # API route definitions
│   │   ├── auth.routes.js
│   │   ├── connection.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── profile.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── constants.js    # Application constants
│   │   └── helper.js       # Helper functions
│   ├── validators/          # Input validators
│   │   └── user.validators.js
│   └── index.js            # Application entry point
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── package.json
├── eslint.config.js         # ESLint configuration
├── APIList.md              # API documentation
└── README.md               # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (Cloud or Local instance)
  - MongoDB Atlas (Recommended for quick setup): [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Or local MongoDB installation

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dev-tinder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables File

Create a `.env` file in the project root directory:

```bash
cp .env.example .env
```

Or manually create `.env` with the required variables (see [Environment Variables](#environment-variables) section).

### 4. Set Up MongoDB

- **Option A: MongoDB Atlas (Cloud - Recommended)**
  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a free account
  3. Create a new cluster
  4. Create a database user with username and password
  5. Get your connection URI
  6. Add your IP address to the IP whitelist

- **Option B: Local MongoDB**
  1. Install MongoDB locally
  2. Start the MongoDB service
  3. Connection URI: `mongodb://localhost:27017`

### 5. Configure Environment Variables

Update your `.env` file with your actual values.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5001

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Authentication
ACCESS_TOKEN_SECRET=your-secret-key-here
ACCESS_TOKEN_EXPIRY=1d

# Email Service (for email verification and password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Environment Variable Details

| Variable              | Description                      | Example                                       |
| --------------------- | -------------------------------- | --------------------------------------------- |
| `PORT`                | Server port                      | `5001`                                        |
| `MONGODB_URI`         | MongoDB connection string        | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `ACCESS_TOKEN_SECRET` | JWT secret key                   | `DEV@Tinder$007`                              |
| `ACCESS_TOKEN_EXPIRY` | JWT expiry time                  | `1d` (1 day)                                  |
| `EMAIL_USER`          | Gmail address for sending emails | `example@gmail.com`                           |
| `EMAIL_PASS`          | Gmail app-specific password      | `xzpgbefkjpnviztj`                            |

**Note**: For Gmail, use an [App-Specific Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start with Nodemon, which automatically restarts when you make changes.

### Production Mode

```bash
npm start
```

### Expected Output

```
DB is connected successfully
DevTinder app listening on port 5001
```

Visit `http://localhost:5001/api/v1/healthcheck/health` to verify the server is running.

## API Endpoints

All endpoints follow the pattern `/api/v1/{resource}`. The default port is `5001`.

### Authentication Endpoints

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| `POST` | `/auth/signup`                | User registration       |
| `POST` | `/auth/login/email`           | Login with email        |
| `POST` | `/auth/login/phone`           | Login with phone number |
| `POST` | `/auth/logout`                | User logout             |
| `POST` | `/auth/verify-email`          | Verify email address    |
| `POST` | `/auth/forgot-password/login` | Password reset          |

### Profile Endpoints

| Method  | Endpoint            | Description               |
| ------- | ------------------- | ------------------------- |
| `GET`   | `/profile/view`     | View current user profile |
| `PATCH` | `/profile/edit`     | Edit profile information  |
| `PATCH` | `/profile/password` | Change password           |

### Connection Request Endpoints

| Method | Endpoint                                     | Description                                              |
| ------ | -------------------------------------------- | -------------------------------------------------------- |
| `POST` | `/connection/request/send/:status/:userId`   | Send connection request (status: `like` or `pass`)       |
| `POST` | `/connection/request/review/:status/:userId` | Review connection request (status: `accept` or `reject`) |

### User Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| `GET`  | `/user/connections` | Get all accepted connections      |
| `GET`  | `/user/requests`    | Get pending connection requests   |
| `GET`  | `/user/feed`        | Get user feed (potential matches) |

### Health Check Endpoint

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| `GET`  | `/healthcheck/health` | Health check endpoint |

## Database Models

### User Model

Stores user profile information with the following fields:

- `firstName`: String (required, 3-40 characters)
- `lastName`: String (required, 3-40 characters)
- `email`: String (unique, validated email format)
- `isEmailVerified`: Boolean (default: false)
- `phoneNumber`: String (unique, 10-digit format)
- `isPhoneVerified`: Boolean (default: false)
- `password`: String (minimum 3 characters, strong password required)
- `photoUrl`: String (default image if not provided)
- `gender`: String (M, MALE, F, FEMALE, O, OTHER)
- `age`: Number
- `about`: String (bio/description)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

### Connection Request Model

Tracks connection requests between users:

- `senderId`: ObjectId (reference to User)
- `receiverId`: ObjectId (reference to User)
- `status`: String (interested, accepted, rejected, pending)
- `createdAt`: Date
- `updatedAt`: Date

## Authentication

This application uses JWT (JSON Web Tokens) for authentication:

1. **Login/Signup**: User receives a JWT token via cookies
2. **Protected Routes**: Requests must include the token in cookies
3. **Token Verification**: Middleware validates token and extracts user information
4. **Password Security**: Passwords are hashed using bcrypt with salting

**Token Storage**: Tokens are stored in HTTP-only cookies with the name `token`

## Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run ESLint to check code quality
npm run lint

# Run tests (currently not implemented)
npm test
```

### Code Quality

This project uses ESLint for code quality. Run the linter with:

```bash
npm run lint
```

### Debugging

To debug the application:

1. Run the dev server: `npm run dev`
2. Logs will appear in the console
3. Check the database directly using MongoDB Compass or Atlas UI

## Common Issues & Solutions

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:

- Verify your `MONGODB_URI` is correct
- Check your MongoDB Atlas IP whitelist (add your current IP)
- Ensure MongoDB service is running (if using local installation)
- Verify your username and password

### JWT Authentication Failed

**Error**: `Unauthorized Request`

**Solution**:

- Ensure token is being sent in cookies
- Check if `ACCESS_TOKEN_SECRET` matches what was used to generate the token
- Verify token hasn't expired

### Email Verification Issues

**Error**: `Failed to send email`

**Solution**:

- Use Gmail app-specific password, not your regular password
- Enable "Less secure app access" or use app-specific password
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5001`

**Solution**:

- Change `PORT` in `.env` to a different port
- Or kill the process using the port: `lsof -ti:5001 | xargs kill -9`

## Testing the API

### Using Postman

1. Import the API endpoints listed above
2. For protected routes, ensure the JWT token cookie is set after login
3. Test endpoints systematically

### Example Signup Request

```bash
curl -X POST http://localhost:5001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit with clear messages
5. Push and create a pull request

## License

ISC

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
