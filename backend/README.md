# 🧭 FindItBack - Backend API

Backend API for FindItBack Lost & Found Platform built with Node.js, Express, MongoDB, and Firebase.

## 🚀 Features

- **RESTful API** with clean MVC architecture
- **Firebase Authentication** with JWT token verification
- **MongoDB** with Mongoose ORM
- **Advanced Matching Algorithm** for lost/found items
- **Search & Filter** functionality
- **Input Validation** with express-validator
- **Security** with Helmet, CORS, Rate Limiting
- **Error Handling** with centralized error middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database & Firebase configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── repositories/    # Database queries
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth, validation, error handling
│   ├── utils/           # Helpers & matching algorithm
│   └── app.js           # Express app setup
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the backend directory:

   ```bash
   copy .env.example .env
   ```

   Update the `.env` file with your credentials:

   ```env
   PORT=5000
   NODE_ENV=development

   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/finditback?retryWrites=true&w=majority

   # Firebase Admin SDK Configuration
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

   # CORS Origin (Frontend URL)
   CORS_ORIGIN=http://localhost:3000

   # API Configuration
   API_PREFIX=/api/v1
   ```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Authentication** > **Email/Password** and **Google Sign-In**
4. Go to **Project Settings** > **Service Accounts**
5. Click **Generate New Private Key**
6. Copy the credentials to your `.env` file

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Click **Connect** > **Connect your application**
4. Copy the connection string to your `.env` file
5. Replace `<username>` and `<password>` with your database credentials
6. Whitelist your IP address in Network Access

### Running the Server

**Development mode (with nodemon):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

All protected routes require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

### API Endpoints

#### **Users**

- `POST /users` - Create/update user profile
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account
- `GET /users/:id` - Get user by ID

#### **Lost Items**

- `POST /lost-items` - Create lost item post
- `GET /lost-items` - Get all lost items (with filters)
- `GET /lost-items/:id` - Get lost item by ID
- `GET /lost-items/my-items` - Get current user's lost items
- `GET /lost-items/search?q=query` - Search lost items
- `PUT /lost-items/:id` - Update lost item
- `DELETE /lost-items/:id` - Delete lost item
- `PATCH /lost-items/:id/resolve` - Mark as resolved

**Query Parameters:**

- `category` - Filter by category
- `location` - Filter by location
- `status` - Filter by status (open/resolved)
- `dateFrom` - Filter from date
- `dateTo` - Filter to date
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

#### **Found Items**

- `POST /found-items` - Create found item post
- `GET /found-items` - Get all found items (with filters)
- `GET /found-items/:id` - Get found item by ID
- `GET /found-items/my-items` - Get current user's found items
- `GET /found-items/search?q=query` - Search found items
- `PUT /found-items/:id` - Update found item
- `DELETE /found-items/:id` - Delete found item
- `PATCH /found-items/:id/return` - Mark as returned

**Query Parameters:**

- Same as Lost Items, plus:
- `isReturned` - Filter by return status (true/false)

#### **Matches**

- `GET /matches` - Get all potential matches
- `GET /matches/my-lost-items` - Get matches for user's lost items
- `GET /matches/my-found-items` - Get matches for user's found items
- `GET /matches/lost/:id` - Get matches for specific lost item
- `GET /matches/found/:id` - Get matches for specific found item

**Query Parameters:**

- `minScore` - Minimum match score (default: 40, range: 0-100)
- `limit` - Maximum number of matches (default: 50)

### Categories

Available categories for items:

- Electronics
- Documents
- Keys
- Bags
- Wallets
- Jewelry
- Clothing
- Pets
- Other

### Response Format

**Success Response:**

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [...]
}
```

## 🔍 Matching Algorithm

The matching algorithm calculates similarity between lost and found items using weighted scoring:

- **Category Match** (30%): Exact match required
- **Location Similarity** (25%): Exact, partial, or word matching
- **Date Proximity** (20%): Within 5 days threshold
- **Title Similarity** (15%): Word matching
- **Description Similarity** (10%): Word matching

Minimum match score: 40% (configurable)

## 🧪 Testing

Run tests:

```bash
npm test
```

## 📝 Environment Variables

| Variable                | Description               | Required                            |
| ----------------------- | ------------------------- | ----------------------------------- |
| `PORT`                  | Server port               | No (default: 5000)                  |
| `NODE_ENV`              | Environment mode          | No (default: development)           |
| `MONGODB_URI`           | MongoDB connection string | Yes                                 |
| `FIREBASE_PROJECT_ID`   | Firebase project ID       | Yes                                 |
| `FIREBASE_PRIVATE_KEY`  | Firebase private key      | Yes                                 |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email     | Yes                                 |
| `CORS_ORIGIN`           | Allowed CORS origin       | No (default: http://localhost:3000) |
| `API_PREFIX`            | API route prefix          | No (default: /api/v1)               |

## 🔒 Security Features

- Firebase token authentication
- Helmet for security headers
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- MongoDB injection prevention
- Error handling without exposing sensitive data

## 🚀 Deployment

### Deploy to Render

1. Create account at [Render](https://render.com/)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy!

### Deploy to Railway

1. Create account at [Railway](https://railway.app/)
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy!

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ORM
- **firebase-admin** - Firebase authentication
- **express-validator** - Input validation
- **cors** - CORS middleware
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **compression** - Response compression
- **morgan** - HTTP logger
- **dotenv** - Environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For support, email your-email@example.com or create an issue in the repository.

---

Made with ❤️ for FindItBack
