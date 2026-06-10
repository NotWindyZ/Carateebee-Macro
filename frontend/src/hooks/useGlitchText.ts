import { useState, useEffect } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-#@$%&*█▓▒░µñæø¿¡><+=\\";

export function useGlitchText(text: string, isActive: boolean): string {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!isActive) {
            setDisplayText(text);
            return;
        }

        const intervalId = setInterval(() => {

            if (Math.random() < 0.1) {
                setDisplayText(`0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(8, '0')}`);
                return;
            }

            const len = Math.max(3, text.length + Math.floor(Math.random() * 5) - 2);
            let result = "";
            for (let i = 0; i < len; i++) {

                if (i < text.length && Math.random() < 0.3) {

                    result += Math.random() > 0.5 ? text[i].toUpperCase() : text[i].toLowerCase();
                } else {
                    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
                }
            }
            setDisplayText(result);
        }, 80); 

        return () => clearInterval(intervalId);
    }, [isActive, text]);

    return displayText;
}
