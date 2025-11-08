# 🧭 FindItBack - Lost & Found Platform

A comprehensive web-based Lost and Found management system built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Firebase Authentication**. The platform helps users post lost or found items and uses an intelligent matching algorithm to suggest potential matches.

## ✨ Features

### 🔐 Authentication

- **Email/Password** authentication
- **Google Sign-In** integration
- Secure Firebase Auth with JWT tokens
- Protected routes

### 📦 Item Management

- **Post Lost Items** with details (title, description, category, location, date, image)
- **Post Found Items** with the same comprehensive details
- **Edit & Delete** your own posts
- **Mark items** as resolved/returned
- **Image Upload** to Firebase Storage

### 🔍 Search & Filter

- **Global Search** across all items
- **Advanced Filters**: Category, Location, Date range
- **Pagination** for performance
- **Real-time Results**

### 🎯 Smart Matching Algorithm

- **AI-Powered Matching** between lost and found items
- **Multi-Factor Scoring**:
  - Category match (30%)
  - Location similarity (25%)
  - Date proximity (20%)
  - Title similarity (15%)
  - Description similarity (10%)
- **Customizable** minimum match score
- **Detailed Match Breakdown** for transparency

### 🎨 Beautiful UI

- **Modern Design** with Teal & Golden-Orange theme
- **Dark Mode** support with theme toggle
- **Responsive** across all devices
- **Smooth Animations** and transitions
- **Intuitive Navigation**
- **Toast Notifications** for user feedback
- **HSL-based Design System** for consistency

## 🏗️ Architecture

### Backend (Node.js + Express)

```
backend/
├── src/
│   ├── config/          # MongoDB & Firebase setup
│   ├── controllers/     # Request handlers (MVC)
│   ├── services/        # Business logic layer
│   ├── repositories/    # Database queries
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── middlewares/     # Auth, validation, errors
│   ├── utils/           # Helpers & matching algorithm
│   └── app.js           # Express app
└── package.json
```

### Frontend (React + Vite)

```
frontend/
├── index.html           # Entry HTML (root level)
├── vite.config.js       # Vite configuration
├── .eslintrc.cjs       # ESLint config
├── src/
│   ├── components/      # Reusable UI components (.jsx)
│   ├── pages/           # Route pages (.jsx)
│   ├── context/         # Auth & Theme context (.jsx)
│   ├── services/        # API services (.jsx)
│   ├── config/          # Firebase config
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app
│   └── index.jsx        # Entry point
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB Atlas** account
- **Firebase** project
- **Git**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd finditback
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/finditback

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# CORS
CORS_ORIGIN=http://localhost:3000
```

Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

VITE_API_URL=http://localhost:5000/api/v1
```

Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

> **Note**: We use **Vite** for lightning-fast development! Server starts in <1 second with instant HMR.

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → **Email/Password** & **Google**
4. Enable **Cloud Storage** for image uploads
5. Get **Web App** credentials for frontend
6. Generate **Service Account** key for backend

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist your IP
5. Get connection string

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

All protected endpoints require:

```
Authorization: Bearer <firebase-id-token>
```

### Endpoints

#### Users

- `POST /users` - Create/update user profile
- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `DELETE /users/me` - Delete account

#### Lost Items

- `POST /lost-items` - Create lost item
- `GET /lost-items` - Get all (with filters)
- `GET /lost-items/:id` - Get by ID
- `GET /lost-items/my-items` - Get user's items
- `PUT /lost-items/:id` - Update item
- `DELETE /lost-items/:id` - Delete item
- `PATCH /lost-items/:id/resolve` - Mark as resolved
- `GET /lost-items/search?q=query` - Search

#### Found Items

- Same endpoints as Lost Items, replace `/lost-items` with `/found-items`
- `PATCH /found-items/:id/return` - Mark as returned

#### Matches

- `GET /matches` - Get all matches
- `GET /matches/my-lost-items` - User's lost item matches
- `GET /matches/my-found-items` - User's found item matches
- `GET /matches/lost/:id` - Matches for specific lost item
- `GET /matches/found/:id` - Matches for specific found item

## 🎨 Tech Stack

### Frontend

- **React** 18 - UI library
- **Vite** 5 - Build tool (⚡ Lightning fast!)
- **React Router** v6 - Routing
- **Tailwind CSS** - Styling with custom HSL theme
- **Firebase** - Auth & Storage
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin** - Auth verification
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Morgan** - HTTP logger

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)

1. Connect GitHub repository
2. Set environment variables
3. Deploy!

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables (use `VITE_` prefix)
5. Deploy!

### Database (MongoDB Atlas)

Already cloud-hosted ✅

## ⚡ Performance

### Development Speed

- **Vite Dev Server**: Starts in <1 second
- **Hot Module Replacement**: <100ms updates
- **Build Time**: ~20 seconds (3x faster than CRA)

## 📈 Future Enhancements

- [ ] In-app chat system
- [ ] Push notifications
- [ ] Map integration with geolocation
- [ ] Image recognition for better matching
- [ ] Admin dashboard
- [ ] Reward system
- [ ] Analytics and insights
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support

## 🎨 Design System

- **Primary Color**: Teal (HSL: 180°, 75%, 42%)
- **Accent Color**: Golden Orange (HSL: 35°, 95%, 55%)
- **Dark Mode**: Full support with persistent theme
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions (cubic-bezier)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## � Team

- **Developer**: Nitesh Sachde
- **GitHub**: [@Nitesh-Sachde](https://github.com/Nitesh-Sachde)

## 🙏 Acknowledgments

- Firebase for authentication & storage
- MongoDB Atlas for database hosting
- Vite for blazing-fast development
- Tailwind CSS for modern styling
- All open-source contributors

---

**Made with ❤️ using the MERN Stack + Vite**

_Let's reunite people with their lost belongings!_ 🎯
