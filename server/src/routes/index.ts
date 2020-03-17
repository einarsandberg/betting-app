import { Router, Request } from 'express';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import MatchRouter from './matchRouter';
import BetRouter from './betRouter';
import { auth } from './middleware';
export interface IApiRequest<T> extends Request {
    body: T;
}

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/matches', auth, MatchRouter);
router.use('/bets', auth, BetRouter);
// Export the base-router
export default router;