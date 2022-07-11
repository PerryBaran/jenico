import React from 'react';
import { Link } from 'react-router-dom';
import {SongInfo} from '../Interface';

function Music(props: {data: SongInfo[]}) {
    const {data} = props
    return (
        <div className="music">
            {data.map((album: SongInfo) => {
                return (
                    <button className='cover' key={album.title}>
                        <Link to={`${album.title}`}>
                            <img src={album.art} alt={`${album.title} album cover`}/>
                            <p>{album.title}</p>
                        </Link>
                    </button>
                )
            })}
        </div>
    );
}

export default Music;