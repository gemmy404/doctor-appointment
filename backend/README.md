# Doctor Appointment System - API

A comprehensive REST API for managing doctor appointments.

---

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication

---

## Features

- JWT-based authentication
- Role-based access control (Admin/User)
- Department management
- Doctor profiles and filtering
- Appointment booking system

---

## Base Routes

```
/api/v1/auth
/api/v1/departments
/api/v1/doctors
/api/v1/appointments
```

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access

- **Admin**: Full access to all endpoints including creating departments and doctors
- **User**: Can view departments/doctors and manage their own appointments

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://username:password@localhost:27017/doctor_appointment
JWT_SECRET_KEY=your_jwt_secret_key
```

---

## Project Structure
```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dto/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── uploads/
├── .env
├── package.json
└── package-lock.json
```

---

## Installation

1. Clone the repository
```bash
git clone https://github.com/gemmy404/doctor-appointment.git
cd doctor-appointment-backend
```

2. Install dependencies
```bash
npm install
```

3. Create uploads folder for storing images
```bash
mkdir uploads
```

---

## Development

```bash
npm run dev
```
---

⭐ If you found this project helpful, please consider giving it a star!