import { Router } from 'express';
import User from 'src/schemas/User';
const router = Router();

// Signup
router.post('/', async (req, res) => {
    const user = new User({ ...req.body });
    try {
        const createdUser = await user.save();
        res.send(createdUser);
    } catch(err) {
        res.status(500).send('An error occured');
    }
    
});

export default router;