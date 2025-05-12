import express from "express";
import { createProject,listProjects, updateProject } from "../controllers/project.controller.js";
import { verifyToken,authorize } from "../middleware/authrize.middleware.js";

const router = express.Router()

router.post("/",verifyToken,authorize(["Admin","Manager"]),createProject)
router.get("/:companyID",verifyToken,authorize(['Admin', 'Manager']),listProjects)
router.put('/:projectId', verifyToken, authorize(['Admin', 'Manager']), updateProject);

export default router