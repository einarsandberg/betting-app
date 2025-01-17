
export interface IMatchBet {
    matchId: string;
    homeGoals?: number;
    awayGoals?: number;
}

export default class BetService {
    private baseUrl = '/api/bets';

    public placeBet = async (bet: IMatchBet[]): Promise<string> => {
        const res = await fetch(
            `${this.baseUrl}`, 
            {
                body: JSON.stringify(bet),
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }),
            }
        );
        const data = await res.json();
        return data;
    }

    public getBet = async (): Promise<IMatchBet[]> => {
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
        const data = await res.json();
        return data;
    }
}