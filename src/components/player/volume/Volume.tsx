import React, { useState, useEffect, RefObject, ChangeEvent} from 'react';
import style from './volume.module.css';
import { mediumVolume, lowVolume, muteVolume } from '../../../media/icons/index';

function Volume(props: {audioRef: RefObject<HTMLAudioElement>}) {
    const { audioRef } = props
    const [volume, setVolume] = useState(0.5);
    const [icon, setIcon] = useState(mediumVolume);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, audioRef]);

    useEffect(() => {
        setIcon(()=> {
            if (volume === 0) {
                return muteVolume
            }
            if (volume < 0.5) {
                return lowVolume
            }
            return mediumVolume
        });
    }, [volume]);

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.target.value)/100;
        setVolume(currentVolume);
    };

    return (
        <div className={style.container}>
                    <input
                        type='range'
                        name='volume'
                        min={0}
                        max={100}
                        defaultValue={volume * 100}
                        onChange={e => changeVolume(e)}/>
                    <button><img src={icon} alt='volume'/></button>
                </div>
    );
}

export default Volume;