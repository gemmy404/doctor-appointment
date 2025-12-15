import {HttpStatus} from "../utils/httpStatusText.js";
import {AppResponse} from "../dto/app-response.dto.js";

export const errorHandler = ((error, req, res, next) => {
    return res
        .status(error.status || 500)
        .json(error.appResponse || AppResponse(HttpStatus.ERROR, error.message));
});