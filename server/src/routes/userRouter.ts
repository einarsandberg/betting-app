import { Router } from 'express';
import User from 'src/schemas/User';
const router = Router();

// Signup
router.post('/', (req, res) => {
    // todo: add validation. maybe with mongoose?
    const user = new User({ ...req.body });
    user.save((err: string) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occured');
        }
    });
    res.send('Successfully created user');
});

export default router;