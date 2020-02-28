import mongoose, { Schema, Document } from 'mongoose';
import Match, { IMatch } from './Match';

export interface IBet extends Document {
    email: string;
    matches: IMatch[];
}

const BetSchema: Schema = new Schema({
    email: { 
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true, 
        index: true,
        unique: true,
        validate: (input: string): boolean => /\S+@\S+\.\S+/.test(input.toLowerCase()),
    },
    matches: [ Match ],
});

export default mongoose.model<IBet>('Bet', BetSchema);
