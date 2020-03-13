import jwt from 'jsonwebtoken';

interface ILoginResponse extends IAuthStatusResponse {
    token: string;
}

interface IAuthStatusResponse {
    authorized: boolean;
    user: IUser;
}
export interface IUser {
    email: string;
    firstName: string;
    password: string;
    admin: boolean;
}


export default class AuthService {

    private baseUrl = '/api/auth';

    public login = async (email: string, password: string): Promise<ILoginResponse> => {
        const res = await fetch(
            `${this.baseUrl}/login`, 
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),

            }
        );
        const data: ILoginResponse = await res.json();
        const expiryDate = (jwt.decode(data.token) as { email: string; iat: number; exp: number; }).exp * 1000;
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('jwtExpiryDate', expiryDate.toString());
        return data;
    }

    public auth = async(): Promise<IAuthStatusResponse> => {
        const res = await fetch(
            `${this.baseUrl}/status`, 
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }),
            }
        );
        
        return res.json();
    }
}
