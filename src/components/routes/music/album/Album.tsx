import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { SongInfo, Songs } from "../../../../Interface";
import style from "./album.module.css";
import { playCircle, pauseCircle } from "../../../../media/icons/index";

interface Props {
  data: SongInfo[];
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  songIndex: number;
  setSongIndex: Dispatch<SetStateAction<number>>;
  albumIndex: number;
  setAlbumIndex: Dispatch<SetStateAction<number>>;
}

function Album(props: Props) {
  const {
    data,
    playing,
    setPlaying,
    songIndex,
    setSongIndex,
    albumIndex,
    setAlbumIndex,
  } = props;
  const params = useParams();
  const pageIndex = data.findIndex((album) => album.title === params.id);
  const album = data[pageIndex];

  const playCurrentAlbum = () => {
    if (pageIndex === albumIndex) {
      setPlaying(!playing);
    } else {
      setAlbumIndex(pageIndex);
      setSongIndex(0);
      setPlaying(true);
    }
  };

  const playSelectedSong = (index: number) => {
    if (pageIndex === albumIndex) {
      setSongIndex(index);
      setPlaying(true);
    } else {
      setAlbumIndex(pageIndex);
      setSongIndex(index);
      setPlaying(true);
    }
  };

  return (
    <>
      <div
        className={style.albumBackground}
        style={{ backgroundImage: `url(${album?.art})` }}
      />
      <div className={style.albumContainer}>
        <div>
          <h2>
            <a href={album?.hyperlink} target="_blank" rel="noreferrer">
              {album?.title}
            </a>
          </h2>
          <div className={style.album}>
            <button onClick={() => playCurrentAlbum()}>
              <img src={album?.art} alt={`Cover for ${album?.title}`} />
              <img
                src={
                  playing && pageIndex === albumIndex ? pauseCircle : playCircle
                }
                alt="play/pause album"
              />
            </button>
            {album?.songs.length && album.songs.length > 1 && (
              <ul>
                {album?.songs.map((song: Songs, i: number) => {
                  return (
                    <li
                      key={song.name}
                      className={
                        pageIndex === albumIndex && songIndex === i
                          ? style.playing
                          : undefined
                      }
                    >
                      <button onClick={() => playSelectedSong(i)}>
                        {song.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Album;
