import { Link } from "react-router-dom";
import { SongInfo } from "../../../Interface";
import style from "./music.module.css";
import Background from "../../background/Background";
import { background } from "../../../media/images/index";

function Music(props: { data: SongInfo[] }) {
  const { data } = props;

  return (
    <>
      <Background src={background} />
      <div className={style.container}>
        {data.map((album: SongInfo) => {
          return (
            <Link to={album.title} key={album.title} className={style.album}>
              <img src={album.art} alt={`${album.title} album cover`} />
              <p>{album.title}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Music;
