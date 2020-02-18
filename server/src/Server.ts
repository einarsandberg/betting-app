import express from 'express';
import BaseRouter from './routes';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './passport/config';

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configurePassport();
app.use(session({ secret: String(process.env.SESSION_SECRET) }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', BaseRouter);

// Export express instance
export default app;
