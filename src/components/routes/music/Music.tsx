import React from 'react';
import { Link } from 'react-router-dom';
import { SongInfo } from '../../../Interface';
import style from './music.module.css';
import BackgroundImage from '../../background/image/BackgroundImage';
import { background } from '../../../media/images/index'

function Music(props: {data: SongInfo[]}) {
    const {data} = props
    return (
        <div>
            <BackgroundImage src={background}/> 
            <div className={style.container}>
                {data.map((album: SongInfo) => {
                    return (
                        <button className={style.cover} key={album.title}>
                            <Link to={`${album.title}`}>
                                <img src={album.art} alt={`${album.title} album cover`}/>
                                <p>{album.title}</p>
                            </Link>
                        </button>
                    )
                })}
            </div>
        </div>
        
    );
}

export default Music;