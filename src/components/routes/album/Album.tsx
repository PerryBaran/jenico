import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { SongInfo, Songs } from "../../../Interface";
import style from "./album.module.css";
import { playCircle, pauseCircle } from "../../../media/icons/index";

interface Props {
  data: SongInfo[];
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  selectedSong: string;
  setSelectedSong: Dispatch<SetStateAction<string>>;
}

function Album(props: Props) {
  const { data, playing, setPlaying, selectedSong, setSelectedSong } = props;
  const params = useParams();
  const album = data.find((album) => album.title === params.album);

  const handlePlayAlbum = () => {
    if (!album) return;
    const { songs } = album;
    if (songs.some((song) => song.name === selectedSong)) {
      setPlaying((prev) => !prev);
    } else {
      setSelectedSong(songs[0].name);
      setPlaying(true);
    }
  };

  const handlePlaySong = (name: string) => {
    setSelectedSong(name);
    setPlaying(true);
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
            <button onClick={handlePlayAlbum}>
              <img src={album?.art} alt={`Cover for ${album?.title}`} />
              <img
                src={
                  playing &&
                  album?.songs.find((song) => song.name === selectedSong)
                    ? pauseCircle
                    : playCircle
                }
                alt="play/pause album"
              />
            </button>
            {album?.songs.length && album.songs.length > 1 && (
              <ul>
                {album?.songs.map((song: Songs) => {
                  return (
                    <li
                      key={song.name}
                      className={
                        song.name === selectedSong ? style.playing : undefined
                      }
                    >
                      <button onClick={() => handlePlaySong(song.name)}>
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
