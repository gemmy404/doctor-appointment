import {asyncWrapper} from "../middlewares/asyncWrapper.js";
import appError from "../utils/app-error.utils.js";
import {AppResponse} from "../dto/app-response.dto.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import {Doctor} from "../models/doctor.model.js";

export class DoctorController {

    constructor() {
    }

    createDoctor = asyncWrapper(
        async (req, res, next) => {
            const {name, specialty, description, experienceYears} = req.body;
            const image = req.file?.filename;

            if (!name || !specialty || !description || !experienceYears || !image) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'All fields are required', null), 400
                );
                return next(error);
            }

            if (+experienceYears < 1) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'Experience Year must be greater than 0', null), 400
                );
                return next(error);
            }

            const createdDoctor = await Doctor.create({
                name,
                specialty,
                description,
                experienceYears: +experienceYears,
                image,
            });

            return res.status(201).json(AppResponse(HttpStatus.SUCCESS, null, createdDoctor));
        });

    getAllDoctors = asyncWrapper(
        async (req, res, next) => {
            const savedDoctors = await Doctor.find({}, {__v: 0});
            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, savedDoctors));
        });

    getDoctorById = asyncWrapper(
        async (req, res, next) => {
            const id = req.params.id;

            const savedDoctor = await Doctor.findById(id, {__v: 0});
            if (!savedDoctor) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, `Doctor with id: ${id} not found`, null), 404
                );
                return next(error);
            }

            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, savedDoctor));
        });

    filterDoctorsBySpecialty = asyncWrapper(
        async (req, res, next) => {
            const specialty = `^${req.query.specialty}$`;

            const savedDoctors = await Doctor.find({specialty: {$regex: specialty, $options: 'i'}}, {__v: 0});

            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, savedDoctors));
        });

    getDoctorCounts = asyncWrapper(async (req, res, next) => {
        const count = await Doctor.countDocuments({});
        return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, {count}));
    });
}