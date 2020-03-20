import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from 'src/schemas/User';

interface IDecodedData {
    email: string;
}

export const auth = (req: Request, res: Response, next: () => void): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({authorized: false});
    } else {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(401).json({ authorized: false });
            } 
            res.locals.email = (decoded as IDecodedData).email;
            next();
        });
    }
};
/**
 * Function expects to receive email from previous 'auth' middleware function.
 *  
 */
export const adminsOnly = async (req: Request, res: Response, next: () => void): Promise<void> => {
    const user = await User.findOne({ email: res.locals.email });
    
    if (!user?.admin) {
        res.status(401).json({ authorized: false });
    }
    next();
};