# Full Stack Note App

A full-stack note-taking application built with **React** (frontend), **Node.js & Express** (backend), and **MySQL** (database). This project demonstrates a simple CRUD-based notes application with a clean full-stack architecture.

---

## Features

- Create notes
- View all notes
- Update existing notes
- Delete notes
- RESTful API integration
- Persistent storage using MySQL

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API:** REST

---

## Project Structure

```
full-stack-note-app/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── index.js
├── frontend/
│   └── src/
├── .gitignore
└── README.md
```

---

## Prerequisites

- Node.js (v14 or above)
- npm
- MySQL

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/nitin9706/full-stack-note-app.git
cd full-stack-note-app
```

---

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_db
PORT=5000
```

---

## Database Setup

```sql
CREATE DATABASE notes_db;
```

---

## Run the Application

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm start
```

---

## API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/notes     | Get all notes     |
| POST   | /api/notes     | Create a new note |
| PUT    | /api/notes/:id | Update a note     |
| DELETE | /api/notes/:id | Delete a note     |

---

## Future Enhancements

- Docker support
- UI improvements

---
