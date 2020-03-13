import mongoose, { Schema, Document } from 'mongoose';
import { MatchBetSchema }  from './MatchBet';
export interface MatchResult {
    matchId: string;
    homeGoals: number;
    awayGoals: number;
}
export interface IBet extends Document {
    userId: string;
    matches: MatchResult[];
}

export const BetSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    matches: [ MatchBetSchema ],
});

export default mongoose.model<IBet>('Bet', BetSchema);
