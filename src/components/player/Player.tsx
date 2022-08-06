import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import style from './player.module.css';
import { SongInfo } from '../../Interface';
import Audio from './audio/Audio';
import Info from './info/Info';
import ProgresssBar from './progressbar/ProgresssBar';
import Time from './time/Time';
import MediaControls from './mediaControls/MediaControls';
import Volume from './volume/Volume';
import Tracklist from './tracklist/Tracklist';
import KeyboardListener from './keyboardListener/KeyboardListeners';

interface Props {
    data: SongInfo[], 
    playing: boolean, 
    setPlaying: Dispatch<SetStateAction<boolean>>, 
    songIndex: number, 
    setSongIndex: Dispatch<SetStateAction<number>>, 
    albumIndex: number, 
    setAlbumIndex: Dispatch<SetStateAction<number>>,
    formFocused: boolean
};

function Player(props: Props) {
    const {data, playing, setPlaying, songIndex, setSongIndex, albumIndex, setAlbumIndex, formFocused} = props;
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const updateTimer = setInterval(() => {
            if (audioRef.current) {
                const seconds = Math.round(audioRef.current.currentTime)
                setTime(seconds)
            }    
        }, 250);
        return () => clearInterval(updateTimer);
    }, [time]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, audioRef]);

    const skipSong = (forwards = true) => {
        const albumLength = data[albumIndex].songs.length;
        const playlistLength = data.length;
        if (forwards) {
            const nextSongIndex = songIndex + 1;
            if (nextSongIndex < albumLength) {
                setSongIndex(nextSongIndex);
            } else {
                const nextAlbumIndex = albumIndex + 1;
                if (nextAlbumIndex < playlistLength) {
                    setAlbumIndex(nextAlbumIndex);
                    setSongIndex(0);
                } else {
                    setAlbumIndex(0);
                    setSongIndex(0);
                };                
            };
        } else {
            const prevSongIndex = songIndex - 1;
            if (prevSongIndex >= 0) {
                setSongIndex(prevSongIndex);   
            } else {
                const prevAlbumIndex = albumIndex - 1;
                if (prevAlbumIndex >= 0) {
                    setAlbumIndex(prevAlbumIndex);
                    setSongIndex(data[prevAlbumIndex].songs.length - 1);                        
                } else {
                    const lastAlbumIndex = playlistLength - 1;
                    setAlbumIndex(lastAlbumIndex);
                    setSongIndex(data[lastAlbumIndex].songs.length - 1);
                };
            };
        };
    };

    return (
        <section className={style.container}>
            <Audio 
                data={data}
                playing={playing}
                songIndex={songIndex}
                albumIndex={albumIndex}
                audioRef={audioRef}
                setDuration={setDuration}
                skipSong={skipSong}/>
            <Info 
                data={data}
                songIndex={songIndex}
                albumIndex={albumIndex}/>
            <div className={style.center}>
                <ProgresssBar
                    audioRef={audioRef}
                    time={time}
                    duration={duration}/>
                <div className={style.belowBar}>
                    <Time time={time}/>
                    <MediaControls 
                        playing={playing}
                        setPlaying={setPlaying}
                        skipSong={skipSong}/>
                    <Time time={duration}/>
                </div>
            </div>
            <Volume
                volume={volume}
                setVolume={setVolume}/>
            <Tracklist 
                data={data}
                songIndex={songIndex}
                setSongIndex={setSongIndex}
                albumIndex={albumIndex}
                setAlbumIndex={setAlbumIndex}
                setPlaying={setPlaying}/>
            <KeyboardListener 
                playing={playing}
                setPlaying={setPlaying}
                volume={volume}
                setVolume={setVolume}
                skipSong={skipSong}
                formFocused={formFocused}/>
        </section>
    );
};

export default Player;