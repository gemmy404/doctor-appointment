import express from 'express';
import {doctorController} from '../config/objects-init.config.js';
import {upload} from "../utils/uploadFile.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {allowTo} from "../middlewares/allowTo.js";


export const doctorRouter = express.Router();

doctorRouter.route("/")
    .post(verifyToken, allowTo('admin'), upload.single('image'), doctorController.createDoctor)
    .get(doctorController.getAllDoctors);

doctorRouter.route("/by-specialty")
    .get(doctorController.filterDoctorsBySpecialty);

doctorRouter.route("/count")
    .get(doctorController.getDoctorCounts);

doctorRouter.route("/:id")
    .get(doctorController.getDoctorById);