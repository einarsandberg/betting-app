import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
    homeTeam: string;
    awayTeam: string;
    round: number;
    homeGoals?: number;
    awayGoals?: number;
}

const MatchSchema: Schema = new Schema({
    homeTeam: { type: String, required: true, trim: true },
    awayTeam: { type: String, required: true, trim: true },
    homeGoals: { type: Number, required: false },
    awayGoals: { type: Number, required: false },
    round: { type: Number, required: true },
});

export default mongoose.model<IMatch>('Match', MatchSchema);
