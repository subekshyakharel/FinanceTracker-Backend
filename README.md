### Finance Tracker

write about the project

## Table of Contents

- Make llist of the heading
- you are going to create
- ..

# Features

- list all the features you will have
- Login is one of them
- ..

## Technologies

- add technologies you are going to use in this project
- i.e. Node, etc.

## Installation

1. Write step by step
2. Process how anybody can use this project
3. ..

# Usage

Tell people how they actually use and test once the system is working

# API Endpoints

List all the api Endpoint you are going to have
i.e.

1. Login
   `POst /api/v1/users/login`
   This endpoint is used for authenticating a user by sending a user by sending their email/username and password

Request:

- URL: `/api/v1/users/login`
- Method: `POST`
- Headers: - `Content-Type: application/json`
- Body:
  ```sh
  {
      "email" :"user@example.com",
      "password":"your password"
  }
  ```
- Response - Success (200):

  ```sh
  {
    "message": "Login Successful",
    "user": "User info with token"
  }
  ```

- Error(401): - Invalid Credentials:

  ```sh
  {
   "error": "Invalid email or password"
  }
  ```

- Error(500): server error:
  ```sh
  {
    "error": "An error occured while processing the request"
  }
  ```

## Environment Variable

Create a .env file in the root of your project and add the following environment variable

     # JWT Secret Key
     JWT_SECRET=your_jwt_secret

     #Token Expiration Time(e.g., '1h', '7d')
     JWT_EXPIRES_IN=1h

