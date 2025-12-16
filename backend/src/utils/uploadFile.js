import multer from "multer";
import AppError from "./app-error.utils.js";
import {AppResponse} from "../dto/app-response.dto.js";
import {HttpStatus} from "./httpStatusText.js";

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const fileName = `${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "image") {
        return cb(null, true);
    }
    const error = AppError.create(
        AppResponse(HttpStatus.FAIL, "File must be an image"), 400
    );
    return cb(error, false);
};

export const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter,
});