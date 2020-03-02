import mongoose, { Schema, Document } from 'mongoose';

export interface MatchBet {
    homeGoals: number;
    awayGoals: number;
}
export interface IBet extends Document {
    userId: string;
    matches: MatchBet[];
}

export const BetSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    matches: [ 
        {
            homeGoals: { type: Number, required: false },
            awayGoals: { type: Number, required: false },
            matchId: { type: Schema.Types.ObjectId, ref: 'Match', unique: true},
        },
    ],
});

export default mongoose.model<IBet>('Bet', BetSchema);
