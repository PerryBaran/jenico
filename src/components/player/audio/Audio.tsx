import { RefObject, useEffect, Dispatch, SetStateAction } from "react";
import { findSelectedSong } from "../../../helpers/findSelected";
import { SongInfo } from "../../../Interface";

interface Props {
  data: SongInfo[];
  playing: boolean;
  selectedSong: string;
  audioRef: RefObject<HTMLAudioElement>;
  setDuration: Dispatch<SetStateAction<number>>;
  skipSong: () => void;
}

function Audio(props: Props) {
  const { playing, data, selectedSong, audioRef, setDuration, skipSong } =
    props;

  const source = findSelectedSong(selectedSong, data)?.src;

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, selectedSong, audioRef]);

  const updateDuration = () => {
    if (audioRef.current) {
      const seconds = Math.round(audioRef.current.duration);
      setDuration(seconds);
    }
  };

  return (
    <audio
      ref={audioRef}
      src={source}
      onLoadedMetadata={() => {
        updateDuration();
        playing && audioRef.current?.play();
      }}
      onEnded={() => skipSong()}
    />
  );
}

export default Audio;
