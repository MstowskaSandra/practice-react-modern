import { useCallback, useRef, useState } from 'react';

const useTimer = (initailSeconds) => {
    const [counter, setCounter] = useState(initailSeconds);
    const intervalId = useRef(null);
    const initial = useRef(initailSeconds);

    const clear = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    const start = useCallback(() => {
        clear();
        setCounter(initial.current);
        intervalId.current = setInterval(() => {
            setCounter((curr) => {
                if (curr <= 1) {
                    clear();
                    return 0;
                }
                return curr - 1;
            });
        }, 1000);
    }, []);

    const reset = useCallback(() => {
        clear();
        setCounter(initial.current);
    }, []);

    return { value: counter, reset, start };
};

export default useTimer;
