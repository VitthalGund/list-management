import { Router } from 'express';
const router = Router();
import { validateEmailSend } from '../middleware/validators.js';
import { sendEmail } from '../controllers/EmailController.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

router.post('/lists/:listId/send-email', validateEmailSend, handleValidationErrors, sendEmail);

export default router;
