import { Router } from 'express';
import Bet, { MatchBet } from 'src/schemas/Bet';
import { ApiRequest } from '.';
import User from 'src/schemas/User';


const router = Router();
// Signup

router.post('/', async (req: ApiRequest<MatchBet[]>, res) => {
    try {
        const user = await User.findOne({ email: res.locals.email });
        if (!user) return res.status(500).send('User not found');
        
        const bet = new Bet({ userId: user._id, matches: req.body });

        await bet.save();
        res.send('success');
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occured');
    } 
});

export default router;