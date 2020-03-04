import jwt from 'jsonwebtoken';

interface LoginResponse extends AuthStatusResponse {
    token: string;
}

interface AuthStatusResponse {
    authorized: boolean;
    user: User;
}
export interface User {
    email: string;
    firstName: string;
    password: string;
}


export default class AuthService {

    private baseUrl = '/api/auth';

    public login = async (email: string, password: string): Promise<LoginResponse> => {
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
        const data: LoginResponse = await res.json();
        const expiryDate = (jwt.decode(data.token) as { email: string; iat: number; exp: number; }).exp * 1000;
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('jwtExpiryDate', expiryDate.toString());
        return data;
    }

    public auth = async(): Promise<AuthStatusResponse> => {
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
