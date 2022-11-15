import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./tracklist.module.css";
import { menu } from "../../../media/icons/index";
import { SongInfo, Songs } from "../../../Interface";

interface Props {
  data: SongInfo[];
  selectedSong: string;
  selectedAlbum: SongInfo;
  setSelectedSong: Dispatch<SetStateAction<string>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

function Tracklist(props: Props) {
  const { data, selectedSong, selectedAlbum, setSelectedSong, setPlaying } = props;
  const albumIndex = data.indexOf(selectedAlbum);
  const [pageIndex, setPageIndex] = useState(albumIndex);
  const pageAlbum = data[pageIndex];

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

  const selectSong = (name: string) => {
    setSelectedSong(name);
    setPlaying(true);
  };

  return (
    <div className={style.container}>
      <div className={style.tracklist}>
        <img src={pageAlbum?.art} alt={`${pageAlbum.title} cover art`} />
        <div>
          <button onClick={() => scrollTrackList(false)}>&lt;</button>
          <h4>{pageAlbum?.title}</h4>
          <button onClick={() => scrollTrackList()}>&gt;</button>
        </div>
        <ul>
          {pageAlbum?.songs.map((song: Songs) => {
            const { name } = song;
            return (
              <li
                key={name}
                className={
                  pageIndex === albumIndex && name === selectedSong
                    ? style.highlight
                    : undefined
                }
              >
                <button onClick={() => selectSong(name)}>
                  {name}
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
