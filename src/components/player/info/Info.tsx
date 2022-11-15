import {
  findSelectedAlbum,
  findSelectedSong,
} from "../../../helpers/findSelected";
import { SongInfo } from "../../../Interface";
import style from "./info.module.css";

interface Props {
  data: SongInfo[];
  selectedSong: string;
}

function Info(props: Props) {
  const { data, selectedSong } = props;
  const album = findSelectedAlbum(selectedSong, data);
  const song = findSelectedSong(selectedSong, data);

  return (
    <div className={style.container}>
      <img src={album?.art} alt={`${album?.title} cover art`} />
      <div>
        <h3>{album?.title}</h3>
        <p>{song?.name}</p>
      </div>
    </div>
  );
}

export default Info;
