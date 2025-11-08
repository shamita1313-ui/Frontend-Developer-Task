# Frontend-Developer-Task
A scalable and secure full-stack web application for managing tasks, built with Next.js, TailwindCSS, Node.js/Express, and MongoDB. Features JWT authentication, user dashboard, CRUD operations, search/filter, modern UI/UX, and API docs. Built for the Frontend Developer Intern assignment.
# Frontend Developer Intern Task Manager

## Project Overview
This is a scalable full-stack web application built with Next.js for the frontend and Node.js + Express + MongoDB for the backend.  
It enables users to sign up, log in, and manage a task list with create, read, update, and delete (CRUD) operations.  
The app implements JWT-based authentication, secure password hashing, and responsive UI design using TailwindCSS.


## Installation and Running

### Backend Setup
1. Navigate to the backend folder:
cd task-manager-backend

2. Install dependencies:
npm install

3. Create a `.env` file with your MongoDB URI and JWT secret keys.
4. Run the backend server:
npm run start

Runs backend on port 5000.

### Frontend Setup
1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Run the Next.js frontend development server:
npm run dev

Access the app at [http://localhost:3000](http://localhost:3000).


## Features Implemented
- User Signup and Login with JWT authentication.
- Protected dashboard routing.
- Display and update user profile.
- Task CRUD operations.
- Task search and filter.
- Responsive and accessible UI design with TailwindCSS.
- Password hashing and token validation.
- Error handling and validation on server and client.


## API Documentation

| Endpoint             | Method | Description                  | Request Body                       | Response                    |
|----------------------|--------|------------------------------|----------------------------------|-----------------------------|
| `/api/auth/signup`   | POST   | User registration            | `{ name, email, password }`       | `{ user, token }`            |
| `/api/auth/login`    | POST   | User login                   | `{ email, password }`              | `{ user, token }`            |
| `/api/user/profile`  | GET    | Get user profile             | Bearer Token in Header            | `{ userProfile }`            |
| `/api/tasks`         | GET    | Get all tasks                | Bearer Token in Header            | `[ task1, task2, ... ]`      |
| `/api/tasks`         | POST   | Create a task                | `{ title, description, status }`  | `{ newTask }`                |
| `/api/tasks/:id`     | PUT    | Update a task                | Partial task fields               | `{ updatedTask }`            |
| `/api/tasks/:id`     | DELETE | Delete a task                | -                                | `{ message: "Task deleted" }`|


## Screenshots

*(Include screenshots of Signup, Login, Dashboard, Add/Edit Task UI here.)*



## Notes on Scaling & Security
- Modular backend architecture with clear route segregation.
- JWT authentication middleware for secure API access.
- Bcrypt password hashing.
- Scalable Next.js frontend components.
- Ready to deploy to Vercel (frontend) and Heroku/AWS (backend).
- Proper environment variable management with `.env`.


Thank you for reviewing my submission. Please reach out if you have any questions.
