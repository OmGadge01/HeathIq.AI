import express from "express";
import { getRecommendation } from "../controller/recommendationController.js";

const router = express.Router();

router.post("/", getRecommendation);

export default router;
