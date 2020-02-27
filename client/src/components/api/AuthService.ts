
export type LoginResponse = {
    token: string;
}

export default class AuthService {
    
    public static login = async (email: string, password: string): Promise<LoginResponse> => {
        const res = await fetch(
            '/api/auth/login', 
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

    public static auth = async(): Promise<void> => {
        const res = await fetch(
            '/api/auth/status', 
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
