
export interface IMatch {
    _id: string;
    homeTeam: string;
    awayTeam: string;
    group: string;
}

export default class MatchService {
    private baseUrl = '/api/matches';

    public getMatches = async (): Promise<IMatch[]> => {
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
        const data: IMatch[] = await res.json();
        return data;
    }
}