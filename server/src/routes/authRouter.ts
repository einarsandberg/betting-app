import User from 'src/schemas/User';
import jwt from 'jsonwebtoken';
import withAuth from './middleware';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const router = Router();
// TODO: nicer responses
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.status(401).send({ authorized: false, message: 'No user found' });
        }
        const success = await user.comparePassword(req.body.password);
        if (!success) {
            return res.status(401).send({authorized: false, message: 'Wrong username/password'});
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: 900 });

        return res.json({
            token,
            authorized: true,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch(err) {
        console.error(err);
        res.status(500).send({ message: 'Unknown error', authorized: false });
    }
});

router.get('/status', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.json({ authorized: false });
        }
        
        jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
            const decodedData = decoded as { email: string; };
            if (err) {
                return res.json({ authorized: false });
            }
            
            if (decodedData) {
                const user = await User.findOne({ email: decodedData.email  }).select('-_id');
                if (!user) {
                    return res.json({ authorized: false });
                }
                res.send({ user, authorized: true });
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).send({ authorized: false, message: 'Unknown error' });
    }
});

export default router;
