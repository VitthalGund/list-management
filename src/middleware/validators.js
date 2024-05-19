import { body, param } from 'express-validator';

export const validateListCreation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('customProperties').isArray().withMessage('Custom properties must be an array'),
    body('customProperties.*.title').notEmpty().withMessage('Custom property title is required'),
    body('customProperties.*.fallback').notEmpty().withMessage('Custom property fallback is required'),
];

export const validateEmailSend = [
    param('listId').isMongoId().withMessage('Invalid list ID'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('body').notEmpty().withMessage('Body is required'),
];

export const validateCsvUpload = [
    param('listId').isMongoId().withMessage('Invalid list ID'),
];
