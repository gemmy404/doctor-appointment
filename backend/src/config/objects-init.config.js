import {AuthController} from "../controllers/auth.controller.js";
import {DepartmentController} from "../controllers/department.controller.js";
import {DoctorController} from "../controllers/doctor.controller.js";

export const authController = new AuthController();
export const departmentController = new DepartmentController();
export const doctorController = new DoctorController();
