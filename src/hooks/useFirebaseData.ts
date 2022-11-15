import { useState, useEffect } from "react";
import { getURL } from "../services/firebase";
import { SongInfo } from "../Interface";

export default function useFirebaseData(
  data: SongInfo[],
  albumIndex: number,
  songIndex: number
) {
  const [array, setArray] = useState(data);

  useEffect(() => {
    (async function () {
      const copy = [...array];
      const song = copy[albumIndex].songs[songIndex];
      if (!song.src && song.ref) {
        const url = await getURL(song.ref);
        song.src = url;
        setArray(copy);
      }
    })();
  }, [array, songIndex, albumIndex]);

  return [array];
}
