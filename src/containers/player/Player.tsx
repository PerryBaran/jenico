import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import style from './player.module.css';
import { SongInfo } from '../../Interface';
import { play, pause, skip, lowVolume, menu } from '../../media/icons/index';

function Player(props: {data: SongInfo[], songIndex: number, setSongIndex: Dispatch<SetStateAction<number>>, albumIndex: number, setAlbumIndex: Dispatch<SetStateAction<number>>}) {
    const {data, songIndex, setSongIndex, albumIndex, setAlbumIndex} = props;
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [time, setTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
                if (playing) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [playing, songIndex]);

    useEffect(() => {
        const updateTimer = setInterval(() => {
            if (audioRef.current && barRef.current) {
                const seconds = Math.round(audioRef.current.currentTime)
                if (!isNaN(seconds)) {
                    barRef.current.value = `${seconds}`
                    setTime(calcDisplayTime(seconds))
                }
            }    
        }, 250);
        return () => clearInterval(updateTimer);
    });

    const calcDisplayTime = (seconds: number) => {
        let sec: number | string = seconds;
        let min = 0;
        while (sec >= 60) {
            min++;
            sec = sec - 60;
        }
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    };

    const changeTime = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };

    const updateProgressBarDuration = () =>{
        if (audioRef.current && barRef.current) {
            const seconds = Math.round(audioRef.current.duration);
            barRef.current.max = `${seconds}`;
            setDuration(calcDisplayTime(seconds));
        }
    }

    return (
        <section className={style.container}>
            <audio 
                ref={audioRef}
                src={data[albumIndex].songs[songIndex].src}
                onLoadedMetadata={() => {
                    updateProgressBarDuration()}
                }/>
            <div className={style.start}>
                <img src={data[albumIndex].art} alt='album cover art'/>
                <div>
                    <h3>{data[albumIndex].title}</h3>
                    <p>{data[albumIndex].songs[songIndex].name}</p>
                </div>
            </div>
            <div className={style.center}>
                <div className={style.bar}>
                    <input 
                        type='range'
                        ref={barRef}
                        name='time'
                        min={0}
                        defaultValue={0}
                        onChange={e => changeTime(Number(e.target.value))}/>
                    <div className={style.belowBar}>
                        <div>
                            <p>{time}</p>
                        </div>
                        <div>
                            <div className={style.play}>
                                <button><img src={skip} alt='skip backward'/></button>
                                <button onClick={() => setPlaying(!playing)}><img src={playing? pause : play} alt='play/pause'/></button>
                                <button><img src={skip} alt='skip forward'/></button>
                            </div>
                        </div>
                        <div>
                            <p>{duration}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.end}>
                <button><img src={menu} alt='tracklist'/></button>
                <button><img src={lowVolume} alt='volume'/></button>
            </div>
        </section>
    );
}

export default Player;