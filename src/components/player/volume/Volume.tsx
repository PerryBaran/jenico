import { ChangeEvent, Dispatch, SetStateAction } from "react";
import style from "./volume.module.css";
import {
  mediumVolume,
  lowVolume,
  muteVolume,
} from "../../../media/icons/index";

interface Props {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

function Volume(props: Props) {
  const { volume, setVolume } = props;

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const currentVolume = Number(e.target.value) / 100;
    setVolume(currentVolume);
  };

  return (
    <div className={style.container}>
      <input
        type="range"
        name="volume"
        min={0}
        max={100}
        defaultValue={volume * 100}
        onChange={(e) => changeVolume(e)}
      />
      <button>
        <img
          src={
            volume === 0 ? muteVolume : volume < 0.5 ? lowVolume : mediumVolume
          }
          alt="volume"
        />
      </button>
    </div>
  );
}

export default Volume;
