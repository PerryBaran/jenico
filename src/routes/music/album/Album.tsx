import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { SongInfo, Songs } from '../../../Interface';
import style from './album.module.css';

function Album(props: {data: SongInfo[]}) {
    const {data} = props
    const params = useParams()
    const [info, setInfo] = useState<null|SongInfo>(null)

    useEffect(() => {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].title === params.id) {
                setInfo(data[i])
            }
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderSongList = () => {
        if (info?.songs.length && info.songs.length > 1) {
            return (
                <ul className={style.songList}>
                    {info?.songs.map((song: Songs) => {
                        return (
                            <li key={song.name}>
                                <button>{song.name}</button>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    return (
        <div>
            <div className={style.albumBackground} style={{backgroundImage: `url(${info?.art})`}} />
            <div className={style.album}>
                <div>
                    <h2>{info?.title}</h2>
                    <div>
                        <img src={info?.art} alt={`Cover for ${info?.title}`}/>
                        {renderSongList()}
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Album;