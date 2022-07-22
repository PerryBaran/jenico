import {Dispatch, SetStateAction} from 'react';
import style from './mediaControls.module.css';
import { play, pause, skip } from '../../../media/icons/index';

interface Props {
    playing: boolean, 
    setPlaying: Dispatch<SetStateAction<boolean>>, 
    skipSong: (value?: boolean) => void
};

function MediaControls(props: Props ) {
    const { playing, setPlaying, skipSong } = props;

    return (
        <div className={style.container}>
            <button onClick={() => skipSong(false)}><img src={skip} alt='skip backward'/></button>
            <button onClick={() => setPlaying(!playing)}><img src={playing? pause : play} alt='play/pause'/></button>
            <button onClick={() => skipSong()}><img src={skip} alt='skip forward'/></button>
        </div>
    );
};

export default MediaControls;