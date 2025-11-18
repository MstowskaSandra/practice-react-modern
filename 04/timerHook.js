import { useEffect, useState } from "react";

const useTimer = seconds => {
    const [counter, setCounter] = useState(seconds);
    useEffect(() => {
        const id = setInterval(() => {
            setCounter(currCounter => {
                const nextCounter = currCounter - 1;
                if(nextCounter === 0) {
                    clearInterval(id);
                }
                return nextCounter;
            });
        }, 1000);

        return () => clearInterval(id)
    }, []);
    return counter;
}

export default useTimer;