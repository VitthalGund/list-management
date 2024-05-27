# 📋 User List Management and Email Sending API 📧

## Overview

This project implements a RESTful API for managing a list of users with customizable properties and sending emails to the users. It provides endpoints to create user lists, add users via CSV upload, send emails to users on the list, and handle various edge cases such as duplicate emails and missing data.

The project is built using Node.js, Express.js, and MongoDB, with optional features such as sending emails using Nodemailer and managing email queues for scalability.

## Features 🚀

### List Management

- **List Creation**: Admin can create a list with a title and custom properties. Custom properties have a title and a default/fallback value.

### User Management

- **User Addition**: Admin can add users to the list via CSV upload. The application efficiently handles CSVs with 10,000+ records.
- **CSV Format**: Custom properties can be set for a user by defining headers matching the custom properties title in the CSV. If no value is defined, the fallback value is used.

### Email Sending

- **Email Sending**: Admin can send an email to the complete list.
- **Customized Email Content**: Custom properties can be included as placeholders in the email body to be replaced when the email is sent.
- **Unsubscribe Link**: The email contains an unsubscribe link. Clicking it unsubscribes the user from the list.

### Error Handling

- **Error Handling**: The application handles various error states such as duplicate emails, missing data, and invalid CSV formats. It provides detailed error messages and responses.

## ⚙️ Tech Stack 

- Node.js
- Express.js
- MongoDB
- Nodemailer (optional)
- Message Queue (optional)

## 🛠️ Installation 

1. Clone the repository:

    ```bash
    git clone https://github.com/VitthalGund/list-management.git
    ```

2. Install dependencies:

    ```bash
    cd list-management-main
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    PORT=3000
    MONGODB_URI=your-mongodb-uri
    EMAIL_USER=your-email-user
    EMAIL_PASS=your-email-password
    ```

4. Start the server:

    ```bash
    npm start
    ```

# 📋 API Documentation 🚀

## List Endpoints 📝

### Create List
- **POST** `/lists`
  - Create a new list with a title and custom properties.
  - **Request Body**:
    ```json
    {
      "title": "My List",
      "properties": [
        {
          "title": "Custom Property 1",
          "defaultValue": "Default Value"
        },
        {
          "title": "Custom Property 2",
          "defaultValue": "Default Value"
        }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "id": "list-id",
      "title": "My List",
      "properties": [
        {
          "title": "Custom Property 1",
          "defaultValue": "Default Value"
        },
        {
          "title": "Custom Property 2",
          "defaultValue": "Default Value"
        }
      ]
    }
    ```

### Add User to List
- **POST** `/lists/:listId/users`
  - Add a user to the specified list via CSV upload.
  - **Request Body**: CSV file with headers (name, email, custom properties)
  - **Response**:
    ```json
    {
      "success": true,
      "message": "Users added successfully.",
      "totalUsersAdded": 10,
      "totalUsersNotAdded": 2,
      "totalUsersInList": 25
    }
    ```

## User Endpoints 👤

### Get All Users
- **GET** `/users`
  - Retrieve all users.
  - **Response**:
    ```json
    [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "customProperty1": "Value 1",
        "customProperty2": "Value 2"
      },
      {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "customProperty1": "Value 3",
        "customProperty2": "Value 4"
      }
    ]
    ```

### Get User by ID
- **GET** `/users/:userId`
  - Retrieve a user by ID.
  - **Response**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "customProperty1": "Value 1",
      "customProperty2": "Value 2"
    }
    ```

## Email Endpoints 📧

### Send Email to List
- **POST** `/email/send/:listId`
  - Send an email to all users on the specified list.
  - **Request Body**:
    ```json
    {
      "subject": "Your Subject",
      "body": "Your Email Body"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "message": "Email sent successfully."
    }
    ```

## Error Handling 🛠️

- The API handles various error states such as:
  - Duplicate emails
  - Missing data
  - Invalid CSV formats
- Detailed error messages and responses are provided for each error scenario.


## Folder Structure 📂

The project follows a structured folder hierarchy for better organization:

```
src/
├── controllers/
│   ├── ListController.js
│   └── UserController.js
├── middleware/
│   ├── errorHandler.js
│   ├── handleValidationErrors.js
│   └── validators.js
├── models/
│   ├── List.js
│   └── User.js
├── queues/
│   └── emailQueue.js
├── routes/
│   ├── email.js
│   ├── lists.js
│   └── users.js
└── services/
    └── emailService.js
```

## Conclusion 🎉

This project provides a robust solution for managing user lists and sending emails efficiently. It incorporates best practices in backend development, including error handling, scalability, and data integrity. Feel free to explore the codebase and extend it further according to your requirements!

🚀 Happy coding! 🌟
