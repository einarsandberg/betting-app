import { Router } from 'express';
import User from 'src/schemas/User';

const router = Router();
// Signup
router.post('/', async (req, res) => {
    const userData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    const user = new User(userData);
    try {
        await user.save();
        res.send('Successfully created user');
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occured');
    } 
});

export default router;