import BackgroundVideo from '../../background/video/BackgroundVideo';
import { background } from '../../../media/videos/index';
import { spotify, bandcamp, soundcloud, youtube, instagram } from '../../../media/icons/index';
import style from "./home.module.css";
import Socials from './socials/Socials';

function Home() {
    return (
        <div>
            <header className={style.container}>
                <div>
                    <h1>Jenico</h1>
                    <div>
                        <Socials href="https://open.spotify.com/artist/6XqSoJQMIWNKBuLzzmJwiz" imgSrc={spotify} name="Spotify"/>
                        <Socials href="https://jenico.bandcamp.com/" imgSrc={bandcamp} name="Bandcamp"/>
                        <Socials href="https://soundcloud.com/jenico_flac" imgSrc={soundcloud} name="Soundcloud"/>
                        <Socials href="https://www.youtube.com/channel/UCOHuR2EY8wKXsDcocxDvqOA" imgSrc={youtube} name="YouTube"/>
                        <Socials href="https://www.instagram.com/jenico.flac/" imgSrc={instagram} name="Instagram"/>
                    </div>
                </div>
            </header>
            <BackgroundVideo src={background}/>
        </div>
    );
};

export default Home;