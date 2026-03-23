# Task Management Frontend

A modern, responsive web application for managing tasks and enabling team collaboration. Built with React, TypeScript, and Tailwind CSS with a clean, maintainable architecture.

## 📋 Project Overview

This is the frontend application for a full-stack **Task Management System**. It provides users with:
- User authentication (signup/login)
- Task creation, reading, updating, and deletion (CRUD)
- Real-time task status management
- Toast notifications for user feedback
- Secure JWT-based authentication
- Responsive design for all devices

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Task Management Frontend                    │
│                    (React + TypeScript + Vite)                   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼──────────┐  ┌──────────▼──────────┐
         │   Authentication    │  │   Task Management   │
         │   - Login/Signup    │  │   - Create/Read     │
         │   - Token Storage   │  │   - Update/Delete   │
         │   - Protected Routes│  │   - Status Updates  │
         └──────────┬──────────┘  └──────────┬──────────┘
                    │                         │
         ┌──────────▼─────────────────────────▼──────────┐
         │         API Client (Axios)                     │
         │   - Base URL: VITE_API_BASE_URL               │
         │   - JWT Token Interceptors                     │
         │   - Error Handling                             │
         └──────────┬──────────────────────────────────┬──┘
                    │                                  │
                    │ (REST API)                       │ (CORS Headers)
                    ▼                                  ▼
         ┌──────────────────────┐      ┌────────────────────────┐
         │  Backend API Server  │      │  CORS Configuration    │
         │  (FastAPI/Django)    │      │  (Allow Frontend Origin)│
         │  railway.app         │      │                        │
         └──────────────────────┘      └────────────────────────┘
                    ▼
         ┌──────────────────────┐
         │    Database          │
         │    (PostgreSQL)       │
         └──────────────────────┘
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── TaskCard.tsx         # Individual task display
│   │   ├── TaskForm.tsx         # Add/edit task form
│   │   ├── TaskList.tsx         # Task list container
│   │   └── Toast.tsx            # Notification toast component
│   │
│   ├── contexts/                # React Context API setup
│   │   ├── AuthContext.tsx      # Authentication state management
│   │   └── ToastContext.tsx     # Toast notification state
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication logic hook
│   │   └── useTasks.ts          # Task management logic hook
│   │
│   ├── lib/                     # Utilities and helpers
│   │   ├── api.ts               # Axios API client configuration
│   │   └── auth.ts              # Token storage and auth helpers
│   │
│   ├── pages/                   # Page components (routes)
│   │   ├── LoginPage.tsx        # Login page
│   │   ├── SignupPage.tsx       # User registration page
│   │   └── TasksPage.tsx        # Main tasks dashboard
│   │
│   ├── App.tsx                  # Root app component with routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
│
├── public/                      # Static assets
│   └── (favicon, icons, etc.)
│
├── .env                         # Environment variables (locally only)
├── .env.example                 # Environment template (in repo)
├── .gitignore                   # Git ignore configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── index.html                   # HTML entry point
```

## ✨ Key Features

### 🔐 Authentication
- User registration with email and password
- Secure login with JWT token
- Protected routes for authenticated users
- Automatic token refresh and validation
- Token storage in localStorage

### 📝 Task Management
- **Create** new tasks with title and description
- **Read** all tasks with details
- **Update** task information and status
- **Delete** tasks
- Mark tasks as completed/incomplete
- Real-time task updates

### 🎨 User Experience
- Responsive design for desktop, tablet, and mobile
- Toast notifications for actions (success, error, info)
- Loading states and error handling
- Clean, intuitive user interface
- Tailwind CSS for modern styling

### 🔧 Architecture
- Component-based architecture
- Custom hooks for logic separation
- Context API for state management
- Axios interceptors for API calls
- TypeScript for type safety
- Clean Code principles applied

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **UI Framework** | React | 19.2.4 |
| **Language** | TypeScript | ~5.9.3 |
| **Build Tool** | Vite | 8.0.0 |
| **Styling** | Tailwind CSS | 4.2.1 |
| **Routing** | React Router DOM | 7.13.1 |
| **HTTP Client** | Axios | 1.13.6 |
| **Linting** | ESLint | 9.39.4 |
| **Backend** | FastAPI/Django (Python) | - |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rbpata/task-management-frontend.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```
   
   The app will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Start development server with hot-reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run ESLint to check code quality
pnpm lint
```

## 🔌 Environment Configuration

### `.env` File

Create a `.env` file in the root directory:

```env
# Backend API URL - Change based on environment
VITE_API_BASE_URL=http://localhost:8000
```

**Note:** The `.env` file is gitignored and should NOT be committed. Use `.env.example` as a template.

### Environment Fallback
If `VITE_API_BASE_URL` is not set, the app defaults to `http://localhost:8000`.

## 🔐 Authentication Flow

```
User Input (Login/Signup)
        ↓
  LoginPage/SignupPage
        ↓
  AuthContext (useAuth hook)
        ↓
  API Call (api.ts)
        ↓
  Backend Response
        ↓
  Token Storage (localStorage)
        ↓
  Protected Routes
        ↓
  TasksPage / Dashboard
```

## 🌍 CORS Configuration

⚠️ **Important:** The backend must be configured to allow requests from this frontend origin.

### Backend CORS Setup (FastAPI Example)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://task-management-frontend-seven-nu.vercel.app",  # Production
        "http://localhost:5173",  # Development
        "http://localhost:3000",  # Alternative port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Common CORS Error
```
Access to XMLHttpRequest at 'https://backend-url/token' 
from origin 'https://frontend-url' has been blocked by CORS policy
```

**Solution:** Ensure your backend includes the proper CORS headers and whitelists your frontend URL.

## 📦 API Integration

All API calls are handled through [src/lib/api.ts](src/lib/api.ts):

### Authentication Endpoints
- `POST /token` - Login
- `POST /register` - User signup
- `GET /users/me` - Get current user

### Task Endpoints
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

### Request/Response Format

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Error Handling:**
- 401 Unauthorized → Redirect to login
- 400 Bad Request → Show validation errors
- 500 Server Error → Show error toast

## 🧪 Testing

Test files should be placed alongside components:
```
src/
  components/
    TaskCard.tsx
    TaskCard.test.tsx    # Test file
```

Run tests with:
```bash
pnpm test
```

## 🎯 State Management Pattern

### Local State
- Form inputs → `useState`
- UI toggles → `useState`

### Shared State
- Authentication → `AuthContext`
- Notifications → `ToastContext`

### Server State
- Tasks data → React Query (future enhancement)
- User data → Context + API

## 🔒 Security Considerations

- ✅ JWT tokens stored in localStorage
- ✅ Protected routes with authentication checks
- ✅ HTTPS enforced in production
- ✅ Secure password transmission (always use HTTPS)
- ✅ CORS headers validation
- ✅ XSS protection via React's built-in escaping

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS:
- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
pnpm dev -- --port 3000
```

### Environment Variables Not Loading
- Ensure `.env` is in the root directory
- Variables must start with `VITE_`
- Restart the dev server after changing `.env`

### CORS Errors
- Check backend CORS configuration
- Verify `VITE_API_BASE_URL` points to correct backend
- Ensure backend whitelists frontend URL

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [React Router](https://reactrouter.com)

## 🤝 Project Links

- **Frontend Repository:** [GitHub - task-management-frontend](https://github.com/rbpata/task-management-frontend)
- **Deployed Frontend:** [Vercel](https://task-management-frontend-seven-nu.vercel.app)
- **Deployed Backend:** [Railway](https://task-management-backend-production-92dc.up.railway.app)

## 📝 Development Guidelines

### Code Style
- Follow Clean Code principles (Uncle Bob)
- Use meaningful names for variables and functions
- Components have single responsibility
- Extract reusable logic into custom hooks
- Always include TypeScript types

### Commit Messages
```
feat: Add task filtering functionality
fix: Resolve CORS authentication issue
docs: Update README with setup instructions
refactor: Extract TaskCard to separate component
```

### PR Requirements
- Code follows style guidelines
- Tests pass
- No TypeScript errors
- Updated documentation if needed

## 📄 License

This project is part of the Incubyte training program.

---

**Last Updated:** March 2026  
**Version:** 1.0.0
