import mongoose, { Schema, Document } from 'mongoose';
import { IMatch } from './Match';

export interface IMatchBet extends Document {
    homeGoals: number;
    awayGoals: number;
    matchId?: string;
    match?: IMatch;
}

export const MatchBetSchema: Schema = new Schema({
    homeGoals: { type: Number, required: false },
    awayGoals: { type: Number, required: false },
    matchId: { type: Schema.Types.ObjectId },
});

export default mongoose.model<IMatchBet>('MatchBet', MatchBetSchema);
