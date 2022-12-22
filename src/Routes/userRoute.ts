import express from "express";

import userController from "../Controllers/userController";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotpassword", userController.forgotpasswordOTP);

export default router;
