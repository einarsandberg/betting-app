import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', function(this: User, next) {
    const user = this;
    // Short circuit if password isn't modified.
    if (!user.isModified('password')) return next();

    // Generate salt
    bcrypt.genSalt(10, (saltErr: Error, salt: string) => {
        if (saltErr) return next(saltErr);

        // Hash password
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr);

            // Use the hashed password instead of the input
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(this: User, password: string, cb: () => void): void {
    bcrypt.compare(password, this.password, cb);
};

export default mongoose.model<User>('User', UserSchema);
