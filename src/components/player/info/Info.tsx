import style from "./info.module.css";

interface Props {
  albumArt: string | undefined;
  albumName: string | undefined;
  songName: string | undefined;
}

function Info(props: Props) {
  const { albumArt, albumName, songName } = props;

  return (
    <div className={style.container}>
      <img src={albumArt} alt={`${albumName} cover art`} />
      <div>
        <h3>{albumName}</h3>
        <p>{songName}</p>
      </div>
    </div>
  );
}

export default Info;
