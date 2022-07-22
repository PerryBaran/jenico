import { SongInfo } from '../../../Interface';
import style from './info.module.css';

interface Props {
    data: SongInfo[], 
    songIndex: number, 
    albumIndex: number
}

function Info(props: Props) {
    const { data, songIndex, albumIndex } = props;

    return (
        <div className={style.container}>
            <img src={data[albumIndex]?.art} alt='album cover art'/>
                <div>
                    <h3>{data[albumIndex]?.title}</h3>
                    <p>{data[albumIndex]?.songs[songIndex]?.name}</p>
                </div>
        </div>
    );
};

export default Info;