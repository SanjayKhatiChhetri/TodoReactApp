CREATE DATABASE todoapp;

CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  title VARCHAR(255),
  progress INT,
  date VARCHAR(255)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255)
);
