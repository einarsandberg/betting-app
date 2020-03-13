import mongoose, { Schema, Document } from 'mongoose';
import { MatchBetSchema }  from './MatchBet';

export interface IMatchResult {
    matchId: string;
    homeGoals: number;
    awayGoals: number;
}

export interface IBet extends Document {
    userId: string;
    matches: IMatchResult[];
}

export const BetSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    matches: [ MatchBetSchema ],
});

export default mongoose.model<IBet>('Bet', BetSchema);
