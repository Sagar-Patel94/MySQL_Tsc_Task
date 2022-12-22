import express from "express";

import userController from "../Controllers/userController";

const router = express.Router();

router.post("/register", userController.register);

export default router;
