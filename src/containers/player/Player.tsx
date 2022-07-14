import React, { useState, useEffect, Dispatch, SetStateAction, useRef, ChangeEvent } from 'react';
import style from './player.module.css';
import { SongInfo, Songs } from '../../Interface';
import { play, pause, skip, lowVolume, menu } from '../../media/icons/index';
import KeyboardListener from './KeyboardListeners';

function Player(props: {data: SongInfo[], playing: boolean, setPlaying: Dispatch<SetStateAction<boolean>>,songIndex: number, setSongIndex: Dispatch<SetStateAction<number>>, albumIndex: number, setAlbumIndex: Dispatch<SetStateAction<number>>}) {
    const {data, playing, setPlaying, songIndex, setSongIndex, albumIndex, setAlbumIndex} = props;
    const [volume, setVolume] = useState(0.5);
    const [pageIndex, setPageIndex] = useState(albumIndex)
    const [time, setTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barRef = useRef<HTMLInputElement | null>(null);
    const volRef = useRef<HTMLInputElement | null>(null);

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
        setPageIndex(albumIndex)
    }, [albumIndex]);

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

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

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
    };

    const skipSong = (forwards = true) => {
        const albumLength = data[albumIndex].songs.length;
        const playlistLength = data.length;
        if (forwards) {
            const tempSongIndex = songIndex + 1;
            if (tempSongIndex >= albumLength) {
                let tempAlbumIndex = albumIndex + 1;
                if (tempAlbumIndex >= playlistLength) {
                    setAlbumIndex(0);
                    setSongIndex(0);
                    return;
                } else {
                    setAlbumIndex(tempAlbumIndex)
                    setSongIndex(0);
                    return;
                }
            } else {
                setSongIndex(tempSongIndex);
                return;
            }
        } else {
            const tempSongIndex = songIndex - 1;
            if (tempSongIndex < 0) {
                let tempAlbumIndex = albumIndex - 1;
                if (tempAlbumIndex < 0) {
                    setAlbumIndex(playlistLength - 1);
                    setSongIndex(data[playlistLength - 1].songs.length - 1);
                    return;
                } else {
                    setAlbumIndex(tempAlbumIndex);
                    setSongIndex(data[albumIndex - 1].songs.length - 1);
                    return;
                }
            } else {
                setSongIndex(tempSongIndex);
                return;
            }
        }
    };

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.target.value)/100;
        setVolume(currentVolume);
    };

    const scrollTrackList = (forwards = true) => {
        const playlistLength = data.length;
        if (forwards) {
            const tempPageIndex = pageIndex + 1
            if (tempPageIndex >= playlistLength) {
                setPageIndex(0);
            } else {
                setPageIndex(tempPageIndex);
            }
        } else {
            const tempPageIndex = pageIndex - 1
            if (tempPageIndex < 0) {
                setPageIndex(playlistLength - 1);
            } else {
                setPageIndex(tempPageIndex);
            }
        }
    };

    const setSongTracklist = (index: number) => {
        setAlbumIndex(pageIndex);
        setSongIndex(index);
    }

    return (
        <section className={style.container}>
            <audio 
                ref={audioRef}
                src={data[albumIndex]?.songs[songIndex]?.src}
                onLoadedMetadata={() => {
                    updateProgressBarDuration();
                    playing && audioRef.current?.play();
                }}
                onEnded={() => skipSong()}/>
            <div className={style.start}>
                <img src={data[albumIndex]?.art} alt='album cover art'/>
                <div>
                    <h3>{data[albumIndex]?.title}</h3>
                    <p>{data[albumIndex]?.songs[songIndex]?.name}</p>
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
                                <button onClick={() => skipSong(false)}><img src={skip} alt='skip backward'/></button>
                                <button onClick={() => setPlaying(!playing)}><img src={playing? pause : play} alt='play/pause'/></button>
                                <button onClick={() => skipSong()}><img src={skip} alt='skip forward'/></button>
                            </div>
                        </div>
                        <div>
                            <p>{duration}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.end}>
                <div className={style.tracklistContainer}>
                    <div className={style.tracklist}>
                        <div>
                            <button onClick={() => scrollTrackList(false)}>&lt;</button>
                            <h4>{data[pageIndex]?.title}</h4>
                            <button onClick={() => scrollTrackList()}>&gt;</button>
                        </div>
                        <ul>
                            {data[pageIndex]?.songs.map((song: Songs) => {
                                const index = data[pageIndex]?.songs.indexOf(song);
                                return (
                                    <li key={song.name}>
                                        <button className={style.tracklistButton} onClick={() => setSongTracklist(index)}>{song.name}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <button><img src={menu} alt='tracklist'/></button>
                </div>
                <div className={style.volume}>
                    <input
                        type='range'
                        name='volume'
                        ref={volRef}
                        min={0}
                        max={100}
                        defaultValue={volume * 100}
                        onChange={e => changeVolume(e)}/>
                    <button><img src={lowVolume} alt='volume'/></button>
                </div>
            </div>
            <KeyboardListener
                playing={playing}
                setPlaying={setPlaying}
                volume={volume}
                setVolume={setVolume}
                skipSong={skipSong}/>
        </section>
    );
}

export default Player;