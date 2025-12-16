import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {allowTo} from "../middlewares/allowTo.js";
import {departmentController} from "../config/objects-init.config.js";
import {upload} from "../utils/uploadFile.js";

export const departmentRouter = express.Router();

departmentRouter.route('/')
    .get(departmentController.getAllDepartments)
    .post(
        verifyToken,
        allowTo('admin'),
        upload.single('image'),
        departmentController.createDepartment
    );

departmentRouter.route('/count')
    .get(departmentController.getDepartmentCounts);