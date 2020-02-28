
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
        localStorage.setItem('jwt', data.token);
        return data;
    }

    public auth = async(): Promise<AuthStatusResponse> => {
        const res = await fetch(
            `${this.baseUrl}/status`, 
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                }),
            }
        );
        return res.json();
    }
}
