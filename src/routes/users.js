import { Router } from 'express';
const router = Router();
import multer from 'multer';
import { validateCsvUpload } from '../middleware/validators.js';
import { uploadUsers, unsubscribeUser } from '../controllers/UserController.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

const upload = multer({ dest: 'uploads/' });

router.post('/:listId/users/upload', upload.single('file'), validateCsvUpload, handleValidationErrors, uploadUsers);

router.get('/unsubscribe/:userId', unsubscribeUser);

export default router;
