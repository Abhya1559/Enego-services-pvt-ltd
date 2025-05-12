import express from 'express';
import { createTask, listTasks, updateTask } from '../controllers/task.controller.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, authorize(['Admin', 'Manager']), createTask);
router.get('/:projectId', verifyToken, authorize(['Admin', 'Manager']), listTasks);
router.put('/:taskId', verifyToken, authorize(['Admin', 'Manager', 'Member']), updateTask);

export default router;
