import { Router } from 'express';

// Init router and path
const router = Router();

router.get('/', function(req, res) {
    res.send('Hello');
});
// Export the base-router
export default router;
