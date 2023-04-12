import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", AuthController.registerNewUser);

router.post("/login", AuthController.login);

router.post("/loginNotFace", AuthController.loginNotFace);

router.post("/faceAuth", AuthController.faceAuth);

router.post("/logout", AuthController.logout);

export default router;
