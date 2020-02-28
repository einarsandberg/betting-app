import mongoose, { Schema, Document } from 'mongoose';
import { IBet, BetSchema } from './Bet';

export interface IMatch extends Document {
    homeTeam: string;
    awayTeam: string;
    round: number;
    homeGoals?: number;
    awayGoals?: number;
    bet?: IBet[];
}

const MatchSchema: Schema = new Schema({
    homeTeam: { type: String, required: true, trim: true },
    awayTeam: { type: String, required: true, trim: true },
    homeGoals: { type: Number, required: false },
    awayGoals: { type: Number, required: false },
    round: { type: Number, required: true },
    bet: [ BetSchema ],
    
});

export default mongoose.model<IMatch>('Match', MatchSchema);
