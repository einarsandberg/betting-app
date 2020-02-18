import express from 'express';
import BaseRouter from './routes';
// import session from 'express-session';

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(session({ secret: String(process.env.SESSION_SECRET) }));

app.use('/api', BaseRouter);

// Export express instance
export default app;
