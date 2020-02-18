import { Router } from 'express';
import User from 'src/schemas/User';
import jwt from 'jsonwebtoken';
const router = Router();
// Signup
router.post('/', async (req, res) => {
    const user = new User({ ...req.body });
    try {
        await user.save();
        res.send('Successfully created user');
    } catch(err) {
        res.status(500).send('An error occured');
    }
    
});

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, function(err: Error, user) {
        if (err) return res.send('Error');
        
        if (!user) return res.send('No user found');

        user.comparePassword(req.body.password, (err: Error, success: boolean) => {
            if (!success) return res.send('Wrong')

            return res.send('Success');
        });
    });
});

export default router;