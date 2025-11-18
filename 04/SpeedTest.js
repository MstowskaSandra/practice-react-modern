import React, { useEffect, useState } from 'react';
import useRandomItem from './hook';
import useTimer from './timerHook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [inputValue, setInputValue] = useState('');
    const [characters, setCharacters] = useState(0);
    const [isInputDisabled, setInputDisabled] = useState(false);
    const Timer = useTimer(30);

    useEffect(() => {
        regenerateWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Timer.value === 0) {
            setInputDisabled(true);
        }
    }, [Timer.value]);

    const checkCompatability = () => {
        if (word === inputValue) {
            regenerateWord();
            setCharacters((prev) => prev + word.length);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkCompatability();
        }
    };

    const startAgain = () => {
        regenerateWord();
        setCharacters(0);
        setInputValue('');
        setInputDisabled(false);
        Timer.reset();
    };

    return (
        <div>
            <p>{Timer.value}</p>
            <h1>{word}</h1>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isInputDisabled}
                onFocus={() => {
                    if (!isInputDisabled) {
                        Timer.start();
                    }
                }}
            />
            <p>Points: {characters}</p>
            <button type="button" onClick={() => startAgain()}>
                Again
            </button>
        </div>
    );
}

export default SpeedTest;
