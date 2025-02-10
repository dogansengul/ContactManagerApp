# Contact Manager API

A RESTful API for managing contacts, built with Node.js, Express, and MongoDB Atlas. This API features user authentication via JSON Web Tokens (JWT), robust error handling, and a clean, modular codebase following modern best practices. With the help of "Dipesh Malvia" on YouTube.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Overview

The Contact Manager API provides a backend solution for storing and managing contact information. It supports full CRUD (Create, Read, Update, Delete) operations on contacts and includes secure user authentication using JWT. The project is structured into clearly defined modules for controllers, routes, models, and middleware, making it easy to maintain and scale.

## Features

- **Contact Management:** Create, retrieve, update, and delete contacts.
- **User Authentication:** Secure login and registration with JWT.
- **Robust Error Handling:** Custom error classes and centralized error middleware.
- **Async/Await with Express:** Clean asynchronous operations using `express-async-handler`.
- **Environment-Based Configuration:** All sensitive information is stored in environment variables.
- **MongoDB Atlas Integration:** Cloud-hosted MongoDB for reliable and scalable data storage.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database service.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **express-async-handler**: To simplify error handling in async functions.
- **JSON Web Token (JWT)**: For secure authentication.
- **bcrypt**: For hashing and verifying user passwords.
- **dotenv**: To load environment variables.
- **express-async-handler**: To simplify error handling in async functions.
- **ES Modules (ESM)**: Modern JavaScript module system.

