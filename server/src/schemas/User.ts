import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    comparePassword: (password: string, cb: (err: Error, succ: boolean) => void) => void;
}

const UserSchema: Schema = new Schema({
    email: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true,
        unique: true,
        validate: (input: string): boolean => /\S+@\S+\.\S+/.test(input.toLowerCase()),
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true},
    password: { type: String, required: true, minLength: 8, select: false },
});

UserSchema.pre('save', function(this: IUser, next) {
    const user = this;
    // Lowercase email and capitalize first letter of firstName and lastName    
    if (user.isNew) {
        user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase();
        user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase();
    }
    next();
});

UserSchema.pre('save', function(this: IUser, next) {
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

UserSchema.methods.comparePassword = function(password: string, cb: (err: Error, success: boolean) => void): void {
    bcrypt.compare(password, this.password, cb);
};

export default mongoose.model<IUser>('User', UserSchema);
