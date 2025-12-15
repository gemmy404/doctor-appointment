import {asyncWrapper} from "../middlewares/asyncWrapper.js";
import appError from "../utils/app-error.utils.js";
import {AppResponse} from "../dto/app-response.dto.js";
import {HttpStatus} from "../utils/httpStatusText.js";
import {User} from "../models/user.model.js";
import {generateJwt} from "../utils/generateJwt.js";
import bcrypt from 'bcryptjs';

export class AuthController {

    constructor() {
    }

    register = asyncWrapper(
        async (req, res, next) => {
            const {name, email, password} = req.body;
            if (!name || !email || !password || !password.length) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'All fields are required', null), 400
                );
                return next(error);
            }

            const userExists = await User.findOne({email});
            if (userExists) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'Email already exist', null), 400
                );
                return next(error);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await User.create({name, email, password: hashedPassword});
            const token = generateJwt({id: createdUser?._id, email, role: createdUser?.role}, '10m');

            return res.status(201).json(AppResponse(HttpStatus.SUCCESS, null, {token}));
        });

    login = asyncWrapper(
        async (req, res, next) => {
            const {email, password} = req.body;
            if (!email || !password || !password.length) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'Email and password are required', null), 400
                );
                return next(error);
            }

            const savedUser = await User.findOne({email});
            if (!savedUser) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'User not found', null), 404
                );
                return next(error);
            }

            const isPasswordMatch = await bcrypt.compare(password, savedUser.password);
            if (!isPasswordMatch) {
                const error = appError.create(
                    AppResponse(HttpStatus.FAIL, 'Password is incorrect', null), 400
                );
                return next(error);
            }

            const token = generateJwt({id: savedUser._id, email, role: savedUser.role}, '10m');

            return res.status(200).json(AppResponse(HttpStatus.SUCCESS, null, {token}));
        });
}