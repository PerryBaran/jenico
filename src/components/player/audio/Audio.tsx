import { RefObject, useEffect } from "react";

interface Props {
  playing: boolean;
  source: string | undefined;
  audioRef: RefObject<HTMLAudioElement>;
  setDuration: (value: number) => void;
  skipSong: (value?: boolean) => void;
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

  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      const seconds = Math.round(audioRef.current.duration);
      setDuration(seconds);
      if (playing) {
        audioRef.current.play();
      }
    }
  };

  return (
    <audio
      ref={audioRef}
      src={source}
      onLoadedMetadata={handleLoadedMetaData}
      onEnded={() => skipSong()}
      data-testid="audio"
    />
  );
}

export default Audio;
