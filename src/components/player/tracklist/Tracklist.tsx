import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import style from './tracklist.module.css';
import { menu } from '../../../media/icons/index';
import { SongInfo, Songs } from '../../../Interface';

function Tracklist(props: {data: SongInfo[], songIndex: number, setSongIndex: Dispatch<SetStateAction<number>>, albumIndex: number, setAlbumIndex: Dispatch<SetStateAction<number>>, setPlaying: Dispatch<SetStateAction<boolean>>}) {
    const {data, songIndex, setSongIndex, albumIndex, setAlbumIndex, setPlaying} = props;
    const [pageIndex, setPageIndex] = useState(albumIndex);

    useEffect(() => {
        setPageIndex(albumIndex)
    }, [albumIndex]);

    const scrollTrackList = (forwards = true) => {
        const playlistLength = data.length;
        if (forwards) {
            const tempPageIndex = pageIndex + 1
            if (tempPageIndex >= playlistLength) {
                setPageIndex(0);
            } else {
                setPageIndex(tempPageIndex);
            }
        } else {
            const tempPageIndex = pageIndex - 1
            if (tempPageIndex < 0) {
                setPageIndex(playlistLength - 1);
            } else {
                setPageIndex(tempPageIndex);
            }
        }
    };

    const setSongTracklist = (index: number) => {
        setAlbumIndex(pageIndex);
        setSongIndex(index);
        setPlaying(true);
    };

    const highlightSelected = (index: number) => {
        if (pageIndex === albumIndex && index === songIndex) {
            return 'highlight'
        }
        return ''
    };

    return (
        <div className={style.container}>
            <div className={style.tracklist}>
                <img src={data[pageIndex]?.art} alt='cover art'/>
                <div>
                    <button onClick={() => scrollTrackList(false)}>&lt;</button>
                    <h4>{data[pageIndex]?.title}</h4>
                    <button onClick={() => scrollTrackList()}>&gt;</button>
                </div>
                <ul>
                    {data[pageIndex]?.songs.map((song: Songs) => {
                        const index = data[pageIndex]?.songs.indexOf(song);
                        return (
                            <li key={song.name} className={highlightSelected(index)}>
                                <button className={style.tracklistButton} onClick={() => setSongTracklist(index)}>{song.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button><img src={menu} alt='tracklist'/></button>
        </div>
    );
}

export default Tracklist;