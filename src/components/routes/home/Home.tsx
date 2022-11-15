import Background from "../../background/Background";
import { background } from "../../../media/videos/index";
import socials from "../../../media/socials";
import style from "./home.module.css";

function Home() {
  return (
    <>
      <header className={style.container}>
        <div>
          <h1>Jenico</h1>
          <div>
            {socials.map((social) => {
              const { name, src, href } = social;
              return (
                <a
                  href={href}
                  target="_Blank"
                  rel="noreferrer"
                  className={style.social}
                  key={href}
                >
                  <img alt={`${name} icon`} src={src} />
                  <p>{name}</p>
                </a>
              );
            })}
          </div>
        </div>
      </header>
      <Background src={background} video={true} />
    </>
  );
}

export default Home;
