
export interface Match {
    _id: string;
    homeTeam: string;
    awayTeam: string;
    round: number;
}

export interface MatchResult extends Match {
    homeGoals: number;
    awayGoals: number;
}

export default class MatchService {
    private baseUrl = '/api/matches';

    public getMatches = async (): Promise<Match[]> => {
        const res = await fetch(
            `${this.baseUrl}`, 
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }),
            }
        );
        const data: Match[] = await res.json();
        return data;
    }
}