import React, { RefObject, useEffect } from 'react';
import style from './progressBar.module.css';

interface Props{
    barRef: RefObject<HTMLInputElement>, 
    audioRef: RefObject<HTMLAudioElement>, 
    time:number, 
    duration: number
}

function ProgresssBar(props: Props) {
    const {barRef, audioRef, time, duration} = props;

    const changeTime = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };
    
    useEffect(() => {
        if (barRef.current) {
            barRef.current.value = `${time}`
        }
    }, [time, barRef]);

    useEffect(() => {
        if (barRef.current) {
            barRef.current.max = `${duration}`;
        }  
    }, [duration, barRef]);

    return (
        <input 
            type='range'
            ref={barRef}
            name='time'
            min={0}
            defaultValue={0}
            onChange={e => changeTime(Number(e.target.value))}
            className={style.bar}/>
    );
}

export default ProgresssBar;