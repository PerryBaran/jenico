import { SongInfo } from '../../../Interface';
import style from './info.module.css';

interface Props {
    data: SongInfo[], 
    songIndex: number, 
    albumIndex: number
};

function Info(props: Props) {
    const { data, songIndex, albumIndex } = props;
    const album = data[albumIndex];

    return (
        <div className={style.container}>
            <img src={album?.art} alt={`${album?.title} cover art`}/>
            <div>
                <h3>{album?.title}</h3>
                <p>{album?.songs[songIndex]?.name}</p>
            </div>
        </div>
    );
};

export default Info;