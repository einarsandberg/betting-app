import { useEffect } from 'react';
import { useState } from 'react';

function useKey(key: string): boolean {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const match = (e: KeyboardEvent): boolean => e.key.toLowerCase() === key.toLowerCase();

        const onKeyDown = (e: KeyboardEvent): void => {
            if (match(e)) {
                setPressed(true);
            }
        };
    
        const onKeyUp = (e: KeyboardEvent): void => {
            if (match(e)) {
                setPressed(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return (): void => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [key]);

    return pressed;
}

export default useKey;