import AppError from "../utils/app-error.utils.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import {AppResponse} from "../dto/app-response.dto.js";

export const allowTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.connectedUser.role)) {
            const error = AppError.create(
                AppResponse(HttpStatus.FAIL, "You don't have permission to access this resource"), 403
            );
            return next(error);
        }
        next();
    }
};