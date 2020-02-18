// import passport from 'passport';
import User, { IUser } from '../schemas/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';

export default function(): void {
    passport.serializeUser(function(user: IUser, done) {
        done(null, user.id);
    });

    // Get user by id, skip password field
    passport.deserializeUser(function(id: number, done) {
        User.findOne({
            _id: id,
        }, '-password', function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy.Strategy(function(email, password, done) {
        User.findOne({
            email,
        }, function(err: Error, user) {
            if (err) return done(err);
            
            if (!user) return done(null, false);
            user.comparePassword(password, (err: Error, success: boolean) => {
                if (!success) return done(null, false);
                return done(null, user);
            });
        });
    }));
}