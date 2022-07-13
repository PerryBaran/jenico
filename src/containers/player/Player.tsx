import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import style from './player.module.css';
import { SongInfo } from '../../Interface';
import { play, pause, skip, lowVolume, menu } from '../../media/icons/index';

function Player(props: {data: SongInfo[], songIndex: number, setSongIndex: Dispatch<SetStateAction<number>>, albumIndex: number, setAlbumIndex: Dispatch<SetStateAction<number>>}) {
    const {data, songIndex, setSongIndex, albumIndex, setAlbumIndex} = props;
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barRef = useRef<HTMLInputElement | null>(null);

    return (
        <section className={style.container}>
            <div className={style.start}>
                <img src={data[albumIndex].art} alt='album cover art'/>
                <div>
                    <h3>{data[albumIndex].title}</h3>
                    <p>{data[albumIndex].songs[songIndex].name}</p>
                </div>
            </div>
            <div className={style.center}>
                <div className={style.bar}>
                    <input type='range' />
                    <div className={style.belowBar}>
                        <div>
                            <p>0:00</p>
                        </div>
                        <div>
                            <div className={style.play}>
                                <button><img src={skip} alt='skip backward'/></button>
                                <button><img src={playing? pause : play} alt='play/pause'/></button>
                                <button><img src={skip} alt='skip forward'/></button>
                            </div>
                        </div>
                        <div>
                            <p>2:00</p>
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