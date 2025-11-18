import React, { useEffect, useState } from 'react';
import useRandomItem from './hook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [inputValue, setInputValue] = useState('');
    const [characters, setCharacters] = useState(0);

    useEffect(() => {
        regenerateWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <div>
            <h1>{word}</h1>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <p>Points: {characters}</p>
        </div>
    );
}

export default SpeedTest;
