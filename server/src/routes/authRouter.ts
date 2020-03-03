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
            return res.status(401).send({ authorized: false, 'message': 'No user found' });
        }
        const success = await user.comparePassword(req.body.password);
        if (!success) {
            return res.status(401).send({authorized: false, 'message': 'Wrong username/password'});
        }
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET!, { expiresIn: 900 });
        user.refreshToken = uuid();
        await user.save();
        return res.json({
            token,
            refreshToken: user.refreshToken,
            authorized: true,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch(err) {
        res.send('Unknown error');
    }
});

router.post('/status', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({ email: res.locals.email }).select('-_id');
        if (!user) {
            res.send('Unable to find logged in user');
        }
        res.send({ user, authorized: true });
    } catch(err) {
        res.send('Unknown error');
    }
});

export default router;
