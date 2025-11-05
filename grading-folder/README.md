# MentorLink

A full-stack mentorship platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Role-based Access**: Separate flows for mentors and mentees
- **Mentor Profiles**: Mentors can create and edit comprehensive profiles
- **Browse & Filter**: Mentees can browse mentors and filter by skills
- **Contact System**: Email-based contact via mailto links
- **Responsive UI**: Clean, modern interface built with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose ORM
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React with Vite
- React Router for routing
- Tailwind CSS for styling
- Axios for API requests

## Project Structure

```
mentorlink/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── mentorController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Mentor.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── mentorRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MentorCard.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Mentors.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Mentors
- `GET /api/mentors` - Get all active mentors (with optional skill filter)
- `GET /api/mentors/:id` - Get mentor by ID
- `GET /api/mentors/me` - Get current mentor's profile (protected, mentor only)
- `PUT /api/mentors/me` - Update mentor profile (protected, mentor only)
- `DELETE /api/mentors/me` - Deactivate mentor profile (protected, mentor only)

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mentorlink
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

### Run Both Servers Concurrently

From the root directory:
```bash
npm run dev:all
```

## Frontend Routes

- `/` - Landing page with hero section
- `/signup` - User registration
- `/login` - User login
- `/mentors` - Browse and filter mentors
- `/dashboard` - Mentor profile management (protected, mentors only)

## Usage

### For Mentees
1. Sign up as a mentee
2. Browse mentors on the `/mentors` page
3. Filter mentors by skills using the search bar
4. Click "Contact Mentor" to send an email

### For Mentors
1. Sign up as a mentor
2. Navigate to the dashboard
3. Edit your profile with bio, skills, image, and social links
4. Your profile will be visible to mentees

## Deployment

### Backend Deployment (Render)
https://mentorlink-4f2b.onrender.com
 

### Frontend Deployment (Vercel)

https://mentorlink-one-tau.vercel.app/


## Testing the API

You can test the API endpoints using tools like Postman or curl:

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"123456","role":"mentor"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

### Get all mentors
```bash
curl http://localhost:5000/api/mentors
```

### Update mentor profile (requires token)
```bash
curl -X PUT http://localhost:5000/api/mentors/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"bio":"Experienced developer","skills":["JavaScript","React"]}'
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- CORS enabled

## Future Enhancements

- Real-time messaging between mentors and mentees
- Session scheduling
- Rating and review system
- Advanced search filters
- Profile images upload
- Email notifications
- Video call integration

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
