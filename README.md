# Task API

## Description

A simple REST API built using Node.js and Express to manage tasks. It supports creating, reading, updating, and deleting tasks.

## Technologies Used

* Node.js
* Express.js
* Swagger UI
* OpenAPI

## Installation

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

## API Endpoints

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/health`    | Check API health           |
| GET    | `/tasks`     | Get all tasks              |
| GET    | `/tasks/:id` | Get a task by ID           |
| POST   | `/tasks`     | Create a task              |
| PUT    | `/tasks/:id` | Update a task              |
| DELETE | `/tasks/:id` | Delete a task              |
| GET    | `/docs`      | View Swagger documentation |

## Data Storage

Tasks are stored in memory. Data resets when the server restarts.

## Validation

Task titles must be non-empty strings. Invalid requests return appropriate error status codes.
