import { Router } from 'express';
import Bet, { MatchBet } from 'src/schemas/Bet';
import { ApiRequest } from '.';
import User from 'src/schemas/User';


const router = Router();
// Signup

router.put('/', async (req: ApiRequest<MatchBet[]>, res) => {
    try {
        const user = await User.findOne({ email: res.locals.email });
        if (!user) return res.status(500).send('User not found');
        
        await Bet.findOneAndUpdate({ userId: user._id }, { matches: req.body }, { upsert: true });
        res.json({ status: 'success' });
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occured');
    } 
});

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: res.locals.email });
        if (!user) return res.status(500).send('User not found');

        const bet = await Bet.findOne({ userId: user._id });

        if (!bet) return res.json([]);

        res.json(bet.matches);

    } catch(err) {
        console.error(err);
        res.status(500).send('An error occured');
    } 
});


export default router;