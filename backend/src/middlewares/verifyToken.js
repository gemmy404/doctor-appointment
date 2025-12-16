import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.utils.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import {AppResponse} from "../dto/app-response.dto.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        const error = AppError.create(
            AppResponse(HttpStatus.FAIL, "Token is required"), 401
        );
        return next(error);
    }

    const token = authHeader.split(" ")[1];
    try {
        const connectedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.connectedUser = connectedUser;
        next();
    } catch (err) {
        const error = AppError.create(
            AppResponse(HttpStatus.FAIL, err.message), 401
        );
        return next(error);
    }
};