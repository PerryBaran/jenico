import React, { useState, useEffect, RefObject, ChangeEvent} from 'react';
import style from './volume.module.css';
import { mediumVolume, lowVolume, muteVolume } from '../../../media/icons/index';
import { getLocalStorage, populateStorage } from '../../../services/localStorage';

function Volume(props: {audioRef: RefObject<HTMLAudioElement>}) {
    const { audioRef } = props
    const [volume, setVolume] = useState(0.5);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, audioRef]);

    useEffect(() => {
        const getVolume = Number(getLocalStorage('volume'));
        getVolume && setVolume(getVolume)
    }, []);

    const icon = () => {
        if (volume === 0) {
            return muteVolume
        }
        if (volume < 0.5) {
            return lowVolume
        }
        return mediumVolume
    };

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.target.value)/100;
        populateStorage('volume', currentVolume);
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
                    <button><img src={icon()} alt='volume'/></button>
                </div>
    );
}

export default Volume;