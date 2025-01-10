import { Router } from "express";
import { logon, hello } from "../controllers/main.js";
import authenticateToken from "../middleware/main.js";

const router = Router();

router.route("/logon").post(logon); // No middleware here
router.route("/hello").get(authenticateToken, hello); // Middleware applied

export default router;
