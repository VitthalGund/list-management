# 📋 User List Management and Email Sending API 📧

## Overview

This project implements a RESTful API for managing a list of users with customizable properties and sending emails to the users. It provides endpoints to create user lists, add users via CSV upload, send emails to users on the list, and handle various edge cases such as duplicate emails and missing data.

The project is built using Node.js, Express.js, and MongoDB, with optional features such as sending emails using Nodemailer and managing email queues for scalability.

## Features

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

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer (optional)
- Message Queue (optional)

## Installation

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
    MONGODB_URI=<your-mongodb-uri>
    EMAIL_USER=<your-email-user>
    EMAIL_PASS=<your-email-password>
    ```

4. Start the server:

    ```bash
    npm start
    ```

## API Documentation

For detailed API documentation and usage examples, refer to the [Postman Documentation](<link-to-postman-documentation>).

## Folder Structure

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

## Conclusion

This project provides a robust solution for managing user lists and sending emails efficiently. It incorporates best practices in backend development, including error handling, scalability, and data integrity. Feel free to explore the codebase and extend it further according to your requirements!

🚀 Happy coding!
