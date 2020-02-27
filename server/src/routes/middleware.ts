import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

type DecodedData = {
    email: string;
}

const withAuth = (req: Request, res: Response, next: () => void): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                res.locals.email = (decoded as DecodedData).email;
                next();
            }
        });
    }
};

export default withAuth;