import { Router } from 'express';
import passport from 'passport';
import User from 'src/schemas/User';
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


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Authenticated');
});

export default router;