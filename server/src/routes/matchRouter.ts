import { Router } from 'express';
import Match from 'src/schemas/Match';

const router = Router();
// Signup
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().select('homeTeam awayTeam round');
        res.json(matches);
    } catch(err) {
        res.status(500).send('An error occured');
    } 
});

export default router;