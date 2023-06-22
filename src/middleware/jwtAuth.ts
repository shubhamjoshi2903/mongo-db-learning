import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers?.authorization;
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }
    try {
        if (typeof token !== 'undefined') {
            const bearer = token.split(' ');
            const bearerToken = bearer[1];

            const decoded = jwt.verify(bearerToken, process.env.SECRETKEY as Secret);
            if (decoded) {
                next();
            }
        } else {
            //Fobidden
            res.sendStatus(403);
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // return next();
};

export default verifyToken;
