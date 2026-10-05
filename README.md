# RateHub - Store Rating Platform

A full-stack store rating platform built with **React.js, Node.js, Express.js, and PostgreSQL** with role-based access for **System Administrators, Normal Users, and Store Owners**.

## Features

### Admin
- Dashboard with users, stores, and ratings statistics
- Add and manage users and stores
- Search, filter, and sort records
- View store ratings

### Normal User
- Register and login
- Search and discover stores
- Submit ratings from **1-5**
- Modify submitted ratings
- Update password

### Store Owner
- View store average rating and rating breakdown
- View customers who rated the store
- Monitor customer feedback
- Update password

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Vite
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** PostgreSQL
- **Tools:** Docker, Git, GitHub

## Project Structure

```text
Roxiler/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Application/business logic
│   │   ├── middleware/      # Auth and error handling
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Auth, validation and seed utilities
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── database/
│   └── schema.sql
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- PostgreSQL 16+ **or** Docker Desktop
- Git

## Run Locally with PostgreSQL

### 1. Clone

```bash
git clone https://github.com/sonam11011/Roxiler.git
cd Roxiler
```

### 2. Create and initialize the database

Create a PostgreSQL database named `roxiler_rating`, then run:

```bash
psql -U postgres -h localhost -d roxiler_rating -f database/schema.sql
```

You can also execute `database/schema.sql` using pgAdmin.

### 3. Configure and run the backend

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5001
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/roxiler_rating
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Replace `YOUR_PASSWORD` with your PostgreSQL password and set a private random JWT secret.

Seed the demo accounts:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

Backend: `http://localhost:5001`

### 4. Configure and run the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

Frontend: normally `http://localhost:5173`

## Run PostgreSQL with Docker

The repository includes Docker Compose for PostgreSQL.

From the project root:

```bash
docker compose up -d
```

It starts PostgreSQL on port **5432**, creates `roxiler_rating`, and initializes the schema.

For this Docker setup, use:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/roxiler_rating
```

Stop the database:

```bash
docker compose down
```

Stop and remove its data volume:

```bash
docker compose down -v
```

## Demo Accounts

The seed script creates:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@roxiler.local` | `Admin@123` |
| Store Owner | `owner@roxiler.local` | `Owner@123` |

Normal users can register through the application.

## Database

- `users` - users, authentication data and roles
- `stores` - stores and store owners
- `ratings` - user ratings for stores

The schema includes validation constraints, foreign keys and indexes.

## Security

- JWT authentication
- Role-based authorization
- bcrypt password hashing
- Protected API and frontend routes
- PostgreSQL constraints for data integrity
- Environment variables for configuration
- Local `.env` files and secrets excluded from version control

## Useful Commands

### Backend
```bash
npm install
npm run dev
npm start
npm run seed
```

### Frontend
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notes

- Run backend and frontend in separate terminals.
- Make sure PostgreSQL is running before starting the backend.
- Never commit real `.env` files or private secrets.
