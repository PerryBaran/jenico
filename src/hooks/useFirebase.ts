import { useState, useEffect } from "react"
import { getURL } from '../services/firebase';
import { SongInfo } from "../Interface";

export default function useFirebaseData(data: SongInfo[], albumIndex: number, songIndex: number){
    const [array, setArray] = useState(data);
  
    useEffect(() => {
        const copy = [...array];
        const song = copy[albumIndex].songs[songIndex];
        if (!song.src && song.ref) {
            getURL(song.ref)
            .then((url) => {
                song.src = url;
                setArray(copy)
            })
        }
    }, [array, songIndex, albumIndex])

    return [array]
};