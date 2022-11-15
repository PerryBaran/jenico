import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./tracklist.module.css";
import { menu } from "../../../media/icons/index";
import { SongInfo, Songs } from "../../../Interface";
import { findSelectedAlbum } from "../../../helpers/findSelected";

interface Props {
  data: SongInfo[];
  selectedSong: string;
  handleSelectSong: (name: string) => void;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

function Tracklist(props: Props) {
  const { data, selectedSong, handleSelectSong, setPlaying } = props;
  const playingAlbum = findSelectedAlbum(selectedSong, data) || data[0];
  const albumIndex = data.indexOf(playingAlbum);
  const [pageIndex, setPageIndex] = useState(albumIndex);
  const album = data[pageIndex];

  useEffect(() => {
    setPageIndex(albumIndex);
  }, [albumIndex]);

  const scrollTrackList = (forwards = true) => {
    const playlistLength = data.length;
    if (forwards) {
      const tempPageIndex = pageIndex + 1;
      if (tempPageIndex >= playlistLength) {
        setPageIndex(0);
      } else {
        setPageIndex(tempPageIndex);
      }
    } else {
      const tempPageIndex = pageIndex - 1;
      if (tempPageIndex < 0) {
        setPageIndex(playlistLength - 1);
      } else {
        setPageIndex(tempPageIndex);
      }
    }
  };

  const setSongFromTracklist = (name: string) => {
    handleSelectSong(name);
    setPlaying(true);
  };

  return (
    <div className={style.container}>
      <div className={style.tracklist}>
        <img src={album?.art} alt={`${album.title} cover art`} />
        <div>
          <button onClick={() => scrollTrackList(false)}>&lt;</button>
          <h4>{album?.title}</h4>
          <button onClick={() => scrollTrackList()}>&gt;</button>
        </div>
        <ul>
          {album?.songs.map((song: Songs) => {
            return (
              <li
                key={song.name}
                className={
                  pageIndex === albumIndex && song.name === selectedSong
                    ? style.highlight
                    : undefined
                }
              >
                <button onClick={() => setSongFromTracklist(song.name)}>
                  {song.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button>
        <img src={menu} alt="tracklist" />
      </button>
    </div>
  );
}

export default Tracklist;
