import { Router } from 'express';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
// Init router and path
const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
// Export the base-router
export default router;