# Question Paper Generator

A full-stack web application to create, manage, and generate question papers for exams. Admins can register, login, add questions, delete questions, and generate question papers.

---

## Features

- Admin registration and login using JWT authentication
- Add new questions with subject, difficulty, and marks
- Generate a question paper with all added questions
- Delete questions
- Simple and clean interface for managing questions

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/GARIMAAgrawal58/Question-Paper-Generator.git
cd Question-Paper-Generator
Install backend dependencies

bash
Copy code
cd server
npm install
Install frontend dependencies

bash
Copy code
cd ../question-paper-generator
npm install
Run MongoDB

Make sure MongoDB is running locally (default port 27017)

Run backend server

bash
Copy code
cd ../server
node server.js
Run frontend

bash
Copy code
cd ../question-paper-generator
npm start
Usage
Open the frontend in your browser (usually at http://localhost:3000)

Register a new admin account

Login as admin

Add questions with subject, difficulty, and marks

Generate the question paper

Delete questions if needed

Folder Structure
csharp
Copy code
question-paper-system/
│
├── server/                # Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── package.json
│   └── server.js
│
└── question-paper-generator/  # Frontend (React)
    ├── src/
    ├── public/
    ├── package.json
    └── ...
License
This project is open-source and available under the MIT License.

Author
Garima Agrawal
