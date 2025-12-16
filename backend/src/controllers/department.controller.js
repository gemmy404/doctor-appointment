import {asyncWrapper} from "../middlewares/asyncWrapper.js";
import appError from "../utils/app-error.utils.js";
import {AppResponse} from "../dto/app-response.dto.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import {Department} from "../models/department.model.js";
import {Doctor} from "../models/doctor.model.js";

export class DepartmentController {

    constructor() {
    }

    createDepartment = asyncWrapper(
        async (req, res, next) => {
            const {name, description} = req.body;
            const image = req.file?.filename;
            if (!name || !description || !image) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'All fields are required', null), 400
                );
                return next(error);
            }

            const createdDepartment = await Department.create({name, description, image});

            return res.status(201).json(AppResponse(HttpStatus.SUCCESS, null, createdDepartment));
        });

    getAllDepartments = asyncWrapper(
        async (req, res, next) => {
            const savedDepartments = await Department.find({}, {__v: 0});

            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, savedDepartments));
        });

    getDepartmentCounts = asyncWrapper(async (req, res, next) => {
        const count = await Department.countDocuments({});
        return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, {count}));
    });

}