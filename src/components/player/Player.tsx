import { useState, useEffect, useRef } from "react";
import style from "./player.module.css";
import { SongInfo } from "../../Interface";
import Audio from "./audio/Audio";
import Info from "./info/Info";
import ProgresssBar from "./progressbar/ProgresssBar";
import Time from "./time/Time";
import MediaControls from "./mediaControls/MediaControls";
import Volume from "./volume/Volume";
import Tracklist from "./tracklist/Tracklist";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  findSelectedAlbum,
  findSelectedSong,
} from "../../helpers/findSelected";

interface Props {
  data: SongInfo[];
  playing: boolean;
  handlePlaying: (value?: boolean) => void;
  selectedSong: string;
  handleSelectedSong: (value: string) => void;
  formFocused: boolean;
}

function Player(props: Props) {
  const {
    data,
    playing,
    handlePlaying,
    selectedSong,
    handleSelectedSong,
    formFocused,
  } = props;
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useLocalStorage("volume", 0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const album = findSelectedAlbum(selectedSong, data);
  const song = findSelectedSong(selectedSong, data);

  const handleVolume = (value: number) => {
    if (value > 1) {
      setVolume(1);
    } else if (value < 0) {
      setVolume(0);
    } else {
      setVolume(value);
    }
  };

  const handleAudioTime = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (formFocused) return;
    switch (e.code) {
      case "Space": {
        e.preventDefault();
        handlePlaying(!playing);
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        skipSong();
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        skipSong(false);
        break;
      }
      case "ArrowUp":
      case "Equal":
      case "NumpadAdd": {
        e.preventDefault();
        const newVolume = volume + 0.01;
        handleVolume(newVolume);
        break;
      }
      case "ArrowDown":
      case "Minus":
      case "NumpadSubtract": {
        e.preventDefault();
        const newVolume = volume - 0.01;
        handleVolume(newVolume);
        break;
      }
    }
  };

  const skipSong = (forwards = true) => {
    if (!album || !song) return;
    const albumIndex = data.indexOf(album);
    const songIndex = album.songs.indexOf(song);
    const albumLength = data[albumIndex].songs.length;
    const playlistLength = data.length;

    if (forwards) {
      const nextSongIndex = songIndex + 1;
      if (nextSongIndex < albumLength) {
        handleSelectedSong(data[albumIndex].songs[nextSongIndex].name);
      } else {
        const nextAlbumIndex = albumIndex + 1;
        if (nextAlbumIndex < playlistLength) {
          handleSelectedSong(data[nextAlbumIndex].songs[0].name);
        } else {
          handleSelectedSong(data[0].songs[0].name);
        }
      }
    } else {
      const prevSongIndex = songIndex - 1;
      if (prevSongIndex >= 0) {
        handleSelectedSong(data[albumIndex].songs[prevSongIndex].name);
      } else {
        const prevAlbumIndex = albumIndex - 1;
        if (prevAlbumIndex >= 0) {
          handleSelectedSong(
            data[prevAlbumIndex].songs[data[prevAlbumIndex].songs.length - 1]
              .name
          );
        } else {
          const lastAlbumIndex = playlistLength - 1;
          handleSelectedSong(
            data[lastAlbumIndex].songs[data[lastAlbumIndex].songs.length - 1]
              .name
          );
        }
      }
    }
  };

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (audioRef.current) {
        const seconds = Math.round(audioRef.current.currentTime);
        setTime(seconds);
      }
    }, 250);
    return () => clearInterval(updateTimer);
  }, [time]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  });

  return (
    <section className={style.container}>
      <Audio
        playing={playing}
        source={song?.src}
        audioRef={audioRef}
        setDuration={setDuration}
        skipSong={skipSong}
      />
      <Info
        albumArt={album?.art}
        albumName={album?.title}
        songName={song?.name}
      />
      <div className={style.center}>
        <ProgresssBar
          handleAudioTime={handleAudioTime}
          time={time}
          duration={duration}
        />
        <div className={style.belowBar}>
          <Time time={time} />
          <MediaControls
            playing={playing}
            handlePlaying={handlePlaying}
            skipSong={skipSong}
          />
          <Time time={duration} />
        </div>
      </div>
      <Volume volume={volume} handleVolume={handleVolume} />
      <Tracklist
        data={data}
        selectedSong={selectedSong}
        selectedAlbum={album || data[0]}
        handleSelectedSong={handleSelectedSong}
        handlePlaying={handlePlaying}
      />
    </section>
  );
}

export default Player;
