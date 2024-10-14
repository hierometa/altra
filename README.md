# Altametrics Invoice Viewer
This project is a full-stack application for managing invoices. It consists of a **backend** (NestJS) API, a **frontend** (Vite with React), and a **PostgreSQL** database. The application allows users to log in, view, and manage invoices.

## Table of Contents

1. [Technologies](#technologies)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Running the Project](#running-the-project)
5. [Docker Instructions](#docker-instructions)
6. [Seed Data](#seed-data)
7. [License](#license)

## Technologies

- **Backend**: NestJS (Node.js)
- **Frontend**: Vite with React
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker

## Installation

### Prerequisites

Make sure you have the following installed on your local machine:

- **Docker**: For containerizing the app.
- **Docker Compose**: For managing multi-container Docker applications.
- **Node.js**: At least version 18.x
- **PostgreSQL**: If running outside Docker.

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Install Dependencies

After cloning the repository, install the required dependencies.

For the **backend**:
```bash
cd backend
npm install
```

For the **frontend**:
```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env` file for both the backend and frontend, and add the necessary environment variables.

### Backend `.env` File:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/mydb?schema=public
JWT_SECRET=myLi++leSecre+Key
FRONTEND_CORS_ORIGIN=http://localhost:5173
INVOICE_PER_PAGE_LIMIT=6
TOKEN_EXPIRATION='30m'
```

### Frontend `.env` File:

```bash
VITE_API_URL=http://localhost:3000
VITE_FEATURE_X_ENABLED=true
VITE_TOKEN_KEY_LOCAL=altametrics_app_token
VITE_USER_KEY_LOCAL=altametrics_app_user
```

## Running the Project

### Docker Instructions

#### Step 1: Build the Docker Containers

To build and start the Docker containers, run the following command in the root directory of your project (where your `docker-compose.yml` is located):

```bash
docker-compose up --build
```

This will spin up the backend, frontend, and PostgreSQL database. The following services will be available:

- **Backend**: `http://localhost:3000`
- **Frontend**: `http://localhost:5173`
- **PostgreSQL**: `localhost:5432`

#### Step 2: Access the Application

- **Frontend**: Open a browser and go to `http://localhost:5173` to access the frontend.
- **Backend**: The backend API will be accessible at `http://localhost:3000`.

### Without Docker (Manual Setup)

If you are not using Docker, follow these steps to run the backend and frontend locally:

#### Backend

1. **Start PostgreSQL**: Make sure PostgreSQL is running locally.
2. **Run Database Migrations**:

```bash
npx prisma migrate deploy
npx prisma generate
```

3. **Start the Backend**:

```bash
npm run start:dev
```

#### Frontend

1. **Start the Frontend**:

```bash
npm run dev
```

## Seed Data

To seed the database with initial data, you can run the following command:

```bash
npm run seed
```

This will populate the database with some test invoices and users.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


