import express from "express";
import { createUser, getUsers } from "../controller/userController.js";

const router = express.Router();

router.post("/submit", createUser);
router.get("/users", getUsers);     

export default router;