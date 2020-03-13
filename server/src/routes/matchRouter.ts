import { Router } from 'express';
import Match from 'src/schemas/Match';
import { IApiRequest } from '.';
import { IMatchResult } from 'src/schemas/Bet';
import withAuth from './middleware';

const router = Router();
// Signup
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch(err) {
        res.status(500).send('An error occured');
    } 
});

router.patch('/', withAuth, async (req: IApiRequest<IMatchResult[]>, res) => {
    const results  = req.body;
    if (results.length === 0) {
        return res.status(400).json({ message: 'No matches provided' });
    }
    for (const result of results) {
        try {
            // Will save results up to the erroring match, but that's acceptable.
            const match = await Match.findById(result.matchId);
            if (!match) {
                return res.status(404).json({ message: `Match with id ${result.matchId} not found` });
            }
            match.homeGoals = result.homeGoals;
            match.awayGoals = result.awayGoals;
            match.save();
        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: 'An unknown error occured' });
        }
    }

    return res.json({ message: 'Successfully saved results' });
});

export default router;