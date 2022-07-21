import React, { useEffect, Dispatch, SetStateAction } from 'react';

interface Props{
    playing: boolean, 
    setPlaying: Dispatch<SetStateAction<boolean>>, 
    volume: number, 
    setVolume: Dispatch<SetStateAction<number>>, 
    skipSong: (forwards?: boolean) => void,
    formFocused: boolean
}

const KeyboardListener = (props: Props) => {
    const { playing, setPlaying, volume, setVolume, skipSong, formFocused} = props;

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => window.removeEventListener('keydown', keyDownHandler);
    });

    const keyDownHandler = (e: KeyboardEvent) => {
        if (!formFocused) {
            const key = e.code;
            if (key === 'Space') {
                e.preventDefault();
                setPlaying(!playing);
            } if (key === 'ArrowRight') {
                e.preventDefault();
                skipSong();
            } if (key === 'ArrowLeft') {
                e.preventDefault();
                skipSong(false);
            } if (key === 'ArrowUp' || key === 'Equal' || key === 'NumpadAdd') {
                e.preventDefault();
                const newVolume = volume + 0.01;
                if (newVolume < 1) {
                    setVolume(newVolume);
                } else {
                    setVolume(1);
                };
            } if (key === 'ArrowDown' || key === 'Minus' || key === 'NumpadSubtract') {
                e.preventDefault();
                const newVolume = volume - 0.01;
                if (newVolume > 0) {
                    setVolume(newVolume);
                } else {
                    setVolume(0);
                };
            };
        };
        
    };

    return (
        <></>
    )
}

export default KeyboardListener;