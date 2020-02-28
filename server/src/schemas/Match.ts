import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
    homeTeam: string;
    awayTeam: string;
    homeGoals: number;
    awayGoals: number;
}

const MatchSchema: Schema = new Schema({
    homeTeam: { type: String, required: true, trim: true },
    awayTeam: { type: String, required: true, trim: true },
    homeGoals: { type: Number, required: true, trim: true },
    awayGoals: { type: Number, required: true, trim: true },
});

export default mongoose.model<IMatch>('Match', MatchSchema);
