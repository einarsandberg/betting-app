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

// TODO: nicer responses
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, function(err: Error, user) {
        if (err) return res.send('Error');
        
        if (!user) return res.send('Wrong username/password');

        user.comparePassword(req.body.password, (err: Error, success: boolean) => {
            if (!success) return res.send('Wrong username/password');
            
            // Expire after 15 min
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET! , { expiresIn: 900 });
            return res.json({ token });
        });
    });
});

export default router;