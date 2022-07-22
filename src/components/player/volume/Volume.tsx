import { useEffect, ChangeEvent, Dispatch, SetStateAction} from 'react';
import style from './volume.module.css';
import { mediumVolume, lowVolume, muteVolume } from '../../../media/icons/index';
import { getLocalStorage, populateStorage } from '../../../services/localStorage';

interface Props {
    volume: number, 
    setVolume: Dispatch<SetStateAction<number>>
};

function Volume(props: Props) {
    const { volume, setVolume } = props;

    useEffect(() => {
        const getVolume = Number(getLocalStorage('volume'));
        getVolume && setVolume(getVolume)
    }, [setVolume]);

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
};

export default Volume;