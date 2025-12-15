import jwt from 'jsonwebtoken';

export const generateJwt = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn});
}