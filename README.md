# Calendar App

A full-stack application for creating and managing calendar events.

The project is organized into two independent applications:

- **Frontend:** React.
- **Backend:** Node.js with JavaScript.
- **Database:** MongoDB.

## Project structure

```text
calendar-app/
├── frontend/          # React application
├── backend/           # Node.js API
│   ├── .env.example   # Environment variable template
│   └── ...
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/) and npm.
- A local [MongoDB](https://www.mongodb.com/) instance or one from [MongoDB Atlas](https://www.mongodb.com/atlas).
- Git.

## Backend configuration

### 1. Install dependencies

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

### 2. Create the environment variables

Create a `.env` file inside `backend/`, using `backend/.env.example` as a reference.

```env
PORT=3000
DB_CNN=mongodb://localhost:27017/calendar-app
SECRET_JWT_SEED=replace_with_a_secure_random_secret
```

| Variable | Description |
|---|---|
| `PORT` | Port where the Node.js application runs. |
| `DB_CNN` | MongoDB connection string. |
| `SECRET_JWT_SEED` | Secret key used to sign and verify JWTs. |

**Important notes:**

- If you use MongoDB Atlas, replace `DB_CNN` with your cluster's connection string.
- Generate a random, private value for `SECRET_JWT_SEED`. You can create one with:

  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- Do not share the `.env` file or publish its values. The `.env` file must remain outside version control.
- If the MongoDB password contains special characters, make sure to encode them correctly in the URI.

### 3. Run the backend

Use the script available in `backend/package.json`. For example, if the `start` script is defined:

```bash
npm run dev
```

## Frontend configuration

### 1. Install dependencies

From the repository root:

```bash
cd frontend
npm install
```

### 2. Run the frontend

Use the script defined in `frontend/package.json`. In a React project with Vite, it is usually:

```bash
npm run dev
```

If you use another React toolchain, check the scripts available in `frontend/package.json`.

## Run the project

Open two terminals:

**Terminal 1 — Backend**

```bash
cd backend
npm install
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
npm run dev
```

Make sure the frontend points to the backend URL and that MongoDB is available.

## Environment variables and security

- Do not upload `.env` files to the repository.
- Keep `.env.example` up to date when adding or changing variables, but use empty or example values—never real secrets.
- Do not include credentials, tokens, or private connection strings in the source code.
