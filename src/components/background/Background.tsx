import style from "./background.module.css";
import { useState } from "react";

const Background = (props: { src: string; video?: boolean }) => {
  const { src, video } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={style.container}>
      {video ? (
        <video
          autoPlay
          loop
          muted
          src={src}
          onCanPlay={() => setLoaded(true)}
          className={loaded ? style.fadeIn : style.hide}
        />
      ) : (
        <img src={src} alt="background" />
      )}
    </div>
  );
};

export default Background;
