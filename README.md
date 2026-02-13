# Tool Library

A MERN stack tool rental app. Users can list tools, browse, rent, and return them.

## Features

- User auth (register, login, logout)
- Add tools with image upload
- Browse and search tools
- Rent tools 
- My Rented Tools + Return
- Profile with edit and change password

## Setup

### 1. Environment

- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`

**Backend .env (in backend/):**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT
- `REGISTER_PASSPHRASE` - Required phrase for registration
- `CLOUDINARY_*` - For profile picture uploads (Cloudinary)

**Frontend .env:**
- `REACT_APP_SERVER_URL` - Backend URL (e.g. http://localhost:5000)

### 2. Install & Run

**Option A - Production build:**
```sh
npm run build
npm start
```

**Option B - Development:**
```sh
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm start
```

### 3. Create uploads folder

Ensure `backend/uploads/` exists for local tool image storage:
```sh
mkdir -p backend/uploads
```

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary
- **Frontend:** React, React Router, Zustand, Axios, Tailwind CSS, MUI

## Project Structure

```
tool-library-clean/
├── backend/
│   ├── src/
│   │   ├── config/     # database, cloudinary
│   │   ├── controllers/
│   │   ├── lib/        # utils, validators, errors
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   └── uploads/        # local tool images
├── frontend/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── stores/
└── package.json
```
