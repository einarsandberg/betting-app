
export interface Match {
    homeTeam: string;
    awayTeam: string;
    round: number;
    _id: string;
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