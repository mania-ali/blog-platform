# Mini Project 3 - Blog REST API

A RESTful Blog API built with Node.js, Express.js, PostgreSQL, Prisma ORM, JWT authentication, bcrypt, and express-validator.

## Features

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Create blog posts
- Update posts
- Delete posts
- Get all published posts
- Get a single post
- Get all posts by a specific user
- Pagination for published posts
- Input validation
- Centralized error handling
- PostgreSQL database using Prisma ORM
- Prisma migrations

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- express-validator
- CORS

## Project Structure

```text
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── post.js
│   │   └── user.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── postValidator.js
│   │   └── userValidator.js
│   │
│   └── index.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md