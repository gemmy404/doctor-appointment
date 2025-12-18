import express from 'express';
import {appointmentController} from "../config/objects-init.config.js";
import {verifyToken} from "../middlewares/verifyToken.js";

export const appointmentRouter = express.Router();

appointmentRouter.route('/my')
    .get(verifyToken, appointmentController.getMyAppointments)

appointmentRouter.route('/')
    .post(verifyToken, appointmentController.createAppointment);

appointmentRouter.route('/:id')
    .delete(verifyToken, appointmentController.deleteAppointment);