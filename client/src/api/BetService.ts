
export interface MatchBet {
    matchId: string;
    homeGoals?: number;
    awayGoals?: number;
}

export default class BetService {
    private baseUrl = '/api/bets';

    public placeBet = async (bet: MatchBet[]): Promise<string> => {
        const res = await fetch(
            `${this.baseUrl}`, 
            {
                body: JSON.stringify(bet),
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }),
            }
        );
        const data = await res.json();
        return data;
    }
}