import express from "express";
import { login, register } from "../controllers/user.controller.js";
import {createUser,listUser,updateUser} from "../controllers/user.controller.js"

const router = express.Router()



router.post("/register",register)
router.post("/login",login)
router.post("/", verifyToken, authorize(["Admin"]), createUser);
router.get("/:companyId", verifyToken, authorize(["Admin"]), listUser);
router.put("/:userId", verifyToken, authorize(["Admin"]), updateUser);


export default router