import User from 'src/schemas/User';
import jwt from 'jsonwebtoken';
import withAuth from './middleware';
import { Router } from 'express';

const router = Router();
// TODO: nicer responses
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, function (err: Error, user) {
        if (err)
            return res.send('Error');
        if (!user)
            return res.send('Wrong username/password');
        user.comparePassword(req.body.password, (err: Error, success: boolean) => {
            if (!success)
                return res.send('Wrong username/password');
            // Expire after 15 min
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET!, { expiresIn: 900 });
            return res.json({ token });
        });
    }).select('+password');
});

router.post('/status', withAuth, (req, res) => {
    User.findOne({ email: res.locals.email }, (err: Error, user) => {
        if (err)
            return res.send('Error');
        if (!user)
            return res.send('Unable to find logged in user');
        
        res.send({ user });
    });
});

export default router;
