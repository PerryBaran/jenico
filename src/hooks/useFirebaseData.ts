import { useState, useEffect } from "react";
import { getURL } from "../services/firebase";
import { SongInfo } from "../Interface";
import { findSelectedSong } from "../helpers/findSelected";

export default function useFirebaseData(
  data: SongInfo[],
  selectedSong: string
) {
  const [array, setArray] = useState(data);

  useEffect(() => {
    (async function () {
      const copy = [...array];
      const song = findSelectedSong(selectedSong, array);
      if (song && !song.src && song.ref) {
        const url = await getURL(song.ref);
        song.src = url;
        setArray(copy);
      }
    })();
  }, [array, selectedSong]);

  return [array];
}
