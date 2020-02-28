import mongoose, { Schema, Document } from 'mongoose';

export interface IBet extends Document {
    email: string;
    homeGoals: number;
    awayGoals: number;
}

export const BetSchema: Schema = new Schema({
    email: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true,
        unique: true,
        validate: (input: string): boolean => /\S+@\S+\.\S+/.test(input.toLowerCase()),
    },
    homeGoals: { type: Number, required: false },
    awayGoals: { type: Number, required: false },
});

export default mongoose.model<IBet>('Bet', BetSchema);
