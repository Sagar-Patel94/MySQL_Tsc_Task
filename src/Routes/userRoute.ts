import express from "express";

import userController from "../Controllers/userController";
import mwAuth from "../Middleware/authentication";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPasswordOTP);
router.get("/", mwAuth.authentication, userController.allUsers);
router.post("/:userId/documents", userController.createDoc);

export default router;
