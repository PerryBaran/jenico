import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { SongInfo, Songs } from '../../../../Interface';
import style from './album.module.css';
import { playCircle, pauseCircle } from '../../../../media/icons/index';

interface Props {
    data: SongInfo[], 
    playing: boolean, 
    setPlaying: Dispatch<SetStateAction<boolean>>, 
    songIndex: number,
    setSongIndex: Dispatch<SetStateAction<number>>, 
    albumIndex: number, 
    setAlbumIndex: Dispatch<SetStateAction<number>>
}

function Album(props: Props) {
    const {data, playing, setPlaying, songIndex, setSongIndex, albumIndex, setAlbumIndex} = props;
    const params = useParams();
    const pageIndex = data.findIndex(album => album.title === params.id);
    const info = data[pageIndex];

    const isPageAlbumPlaying = () => {
        if (playing && pageIndex === albumIndex) {
            return pauseCircle;
        }
        return playCircle;
    };

    const isSongPlaying = (index: number) => {
        if (pageIndex === albumIndex && songIndex === index) {
            return style.playing;
        }
        return '';
    };

    const playCurrentAlbum = () => {
        if (pageIndex === albumIndex) {
            setPlaying(!playing);
        } else {
            setAlbumIndex(pageIndex);
            setSongIndex(0);
            setPlaying(true);
        }
    };

    const playSelectedSong = (index: number) => {
        if (pageIndex === albumIndex) {
            setSongIndex(index);
            setPlaying(true);
        } else {
            setAlbumIndex(pageIndex);
            setSongIndex(index);
            setPlaying(true);
        }
    };

    return (
        <div>
            <div className={style.albumBackground} style={{backgroundImage: `url(${info?.art})`}}/>
            <div className={style.album}>
                <div>
                    <h2><a href={info?.hyperlink} target='_blank' rel="noreferrer">{info?.title}</a></h2>
                    <div className={style.cover}>
                        <button className={style.playAlbum} onClick={() => playCurrentAlbum()}>
                            <img src={info?.art} alt={`Cover for ${info?.title}`}/>
                            <img src={isPageAlbumPlaying()} alt='play/pause album' className={style.playPause}/>
                        </button>
                        {info?.songs.length && info.songs.length > 1 &&
                            <ul className={style.songList}>
                                {info?.songs.map((song: Songs, i: number) => {
                                    return (
                                        <li key={song.name} className={`${isSongPlaying(i)} ${style.song}`}>
                                            <button onClick={() => playSelectedSong(i)}>{song.name}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default Album;