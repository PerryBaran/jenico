import { RefObject, useEffect, Dispatch, SetStateAction } from 'react';
import { SongInfo } from '../../../Interface';

interface Props {
    data: SongInfo[], 
    playing: boolean, 
    songIndex: number, 
    albumIndex: number, 
    audioRef: RefObject<HTMLAudioElement>, 
    setDuration: Dispatch<SetStateAction<number>>, 
    skipSong: () => void
};

function Audio (props: Props) {
    const { playing, data, songIndex, albumIndex, audioRef, setDuration, skipSong } = props;

    useEffect(() => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            };
        };
    }, [playing, songIndex, albumIndex, audioRef]);

    const updateDuration = () =>{
        if (audioRef.current) {
            const seconds = Math.round(audioRef.current.duration);
            setDuration(seconds);
        };
    };

    return (
        <audio 
            ref={audioRef}
            src={data[albumIndex]?.songs[songIndex]?.src}
            onLoadedMetadata={() => {
                updateDuration();
                playing && audioRef.current?.play();
            }}
            onEnded={() => skipSong()}
        />  
    );
};

export default Audio;