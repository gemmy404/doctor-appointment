import express from 'express';
import {authController} from '../config/objects-init.config.js';


export const authRouter = express.Router();

authRouter.route("/register")
    .post(authController.register);

authRouter.route("/login")
    .post(authController.login);