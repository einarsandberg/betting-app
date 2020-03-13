import { Router } from 'express';
import Bet, { IMatchResult } from 'src/schemas/Bet';
import { IApiRequest } from '.';
import User from 'src/schemas/User';


const router = Router();

router.put('/', async (req: IApiRequest<IMatchResult[]>, res) => {
    try {
        const user = await User.findOne({ email: res.locals.email });
        if (!user) return res.status(500).send('User not found');
        await Bet.findOneAndUpdate({ userId: user._id }, { matches: req.body }, { upsert: true });
        res.json({ message: 'Success' });
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

        return res.json(bet.matches);

    } catch(err) {
        console.error(err);
        res.status(500).send('An error occured');
    } 
});


export default router;