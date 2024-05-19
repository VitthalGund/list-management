import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Database connection
connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Route imports
import listRoutes from './routes/lists.js';
import userRoutes from './routes/users.js';
import emailRoutes from './routes/email.js';

// Route middleware
app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/email', emailRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
