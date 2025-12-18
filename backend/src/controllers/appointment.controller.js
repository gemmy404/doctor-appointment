import {asyncWrapper} from "../middlewares/asyncWrapper.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import appError from "../utils/app-error.utils.js";
import {AppResponse} from "../dto/app-response.dto.js";
import {Appointment} from "../models/appointment.model.js";
import {Doctor} from "../models/doctor.model.js";

export class AppointmentController {

    constructor() {
    }

    createAppointment = asyncWrapper(
        async (req, res, next) => {
            const {doctor, date, reason} = req.body;
            if (!doctor || !reason || !reason) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'All fields are required', null), 400
                );
                return next(error);
            }

            const savedDoctor = await Doctor.findById(doctor);
            if (!savedDoctor) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, `Doctor with id: ${doctor} not found`, null), 404
                );
                return next(error);
            }

            if (new Date().getTime() > new Date(date).getTime()) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'Date must be after current date', null), 400
                );
                return next(error);
            }

            const createdAppointment = await Appointment.insertOne({
                user: req.connectedUser.id,
                doctor,
                date,
                reason
            });

            return res.status(201).json(AppResponse(HttpStatus.SUCCESS, null, createdAppointment));
        });

    getMyAppointments = asyncWrapper(
        async (req, res, next) => {
            const userId = req.connectedUser.id;

            const savedAppointments = await Appointment
                .find({user: userId}, {__v: 0})
                .sort({ createdAt: -1 })
                .populate('doctor', {__v: 0});

            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, savedAppointments));
        });

    deleteAppointment = asyncWrapper(async (req, res, next) => {
        const appointmentId = req.params.id;

        const deleteAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deleteAppointment) {
            const error = appError.create(
                AppResponse(HttpStatus.FAIL, `Appointment with id: ${appointmentId} not found`, null), 404
            );
            return next(error);
        }

        return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, deleteAppointment));
    });

}