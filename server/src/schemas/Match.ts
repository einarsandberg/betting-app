import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
    homeTeam: string;
    awayTeam: string;
    group: string;
    homeGoals?: number;
    awayGoals?: number;
}

const MatchSchema: Schema = new Schema({
    homeTeam: { type: String, required: true, trim: true },
    awayTeam: { type: String, required: true, trim: true },
    homeGoals: { type: Number, required: false },
    awayGoals: { type: Number, required: false },
    group: { type: String, required: true, maxlength: 1 },
});

export default mongoose.model<IMatch>('Match', MatchSchema);
