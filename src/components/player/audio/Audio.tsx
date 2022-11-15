import { RefObject, useEffect } from "react";

interface Props {
  playing: boolean;
  source: string | undefined;
  audioRef: RefObject<HTMLAudioElement>;
  setDuration: (duration: number) => void;
  skipSong: () => void;
}

function Audio(props: Props) {
  const { playing, source, audioRef, setDuration, skipSong } = props;

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, source, audioRef]);

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
