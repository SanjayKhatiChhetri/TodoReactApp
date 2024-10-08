# React Todo App

A full-stack todo application built with React, Node.js, and PostgreSQL.

## Live Demo

[View the live application](https://todo-react-app-client.vercel.app/)

## Features

- User authentication (signup/login)
- Create, read, update, and delete todos
- Progress tracking for each todo
- Responsive design

## Tech Stack

### Frontend

- React
- Vite
- React Cookie for state management
- CSS for styling

### Backend

- Node.js
- Express.js
- PostgreSQL
- bcrypt for password hashing
- jsonwebtoken for authentication


## API Endpoints

- `GET /todos`: Fetch all todos
- `GET /todos/:userEmail`: Fetch todos for a specific user
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update an existing todo
- `DELETE /todos/:id`: Delete a todo
- `POST /signup`: Register a new user
- `POST /login`: Authenticate a user

## Project Structure

- `server/`: Contains the server-side code
- `client/`: Contains the client-side code and assets
  - `src/`: Source files
    - `components/`: React components
- `package.json`: Project dependencies and scripts
- `README.md`: Project documentation

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository
   `git clone https://github.com/your-username/react-todo-app.git
cd react-todo-app`

2. Install dependencies

   Install server dependencies

   ` cd server`

   ` npm install`

   Install client dependencies

   ` cd ../client`

   ` npm install`

3. Set up environment variables

   - Create a `.env` file in the client directory

   ```.env
   VITE_APP_SERVERURL=http://localhost:8001
   ```

   - Create a `.env` file in the server directory
   - Add the following variables:

   ```
       DB_USERNAME=your_db_username
       DB_PASSWORD=your_db_password
       DB_HOST=localhost
       DB_PORT=5432
       DB_DATABASE=todoreactapp
   ```

4. Set up the database

   - Create a PostgreSQL database named `todoreactapp`
   - Run the SQL commands in `server/data.sql` to create the necessary tables

### Running the Application

1. Start the server

   `cd server`

   `npm run dev`

2. Start the client

   ` cd client`

   ` npm start`

3. Open your browser and navigate to `http://localhost:5173`

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please [open a issue](https://github.com/SanjayKhatiChhetri/TodoReactApp/issues) or submit a [Pull Request](https://github.com/SanjayKhatiChhetri/TodoReactApp/pulls).

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/SanjayKhatiChhetri/TodoReactApp/blob/main/LICENSE) file for details. Contact If you have any questions or inquiries, please contact Sanjay Khati Chhetri, social can be found at [Github Profile](https://github.com/SanjayKhatiChhetri) under Where to find me section.
