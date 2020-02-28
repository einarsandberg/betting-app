import { Router } from 'express';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import MatchRouter from './matchRouter';
import withAuth from './middleware';
// Init router and path
const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/matches', withAuth, MatchRouter);
// Export the base-router
export default router;