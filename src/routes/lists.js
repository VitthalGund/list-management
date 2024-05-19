import { Router } from 'express';
const router = Router();
import { validateListCreation } from '../middleware/validators.js';
import { createList } from '../controllers/ListController.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

router.post('/', validateListCreation, handleValidationErrors, createList);

export default router;
