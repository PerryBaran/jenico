import React from 'react';
import BackgroundVideo from '../../background/video/BackgroundVideo';
import { background } from '../../../media/videos/index';
import { spotify, bandcamp, soundcloud, youtube, instagram} from '../../../media/icons/index';
import style from "./home.module.css";

function Home() {
    return (
        <div>
            <header className={style.container}>
                <div>
                    <h1>Jenico</h1>
                    <div>
                        <a href="https://open.spotify.com/artist/6XqSoJQMIWNKBuLzzmJwiz" target="_Blank" rel="noreferrer"><img alt="spotify" src={spotify}/><p>Spotify</p></a>
                        <a href="https://jenico.bandcamp.com/" target="_Blank" rel="noreferrer"><img alt="bandcamp" src={bandcamp}/><p>Bandcamp</p></a>
                        <a href="https://soundcloud.com/jenico_flac" target="_Blank" rel="noreferrer"><img alt="soundcloud" src={soundcloud}/><p>SoundCloud</p></a>
                        <a href="https://www.youtube.com/channel/UCOHuR2EY8wKXsDcocxDvqOA" target="_Blank" rel="noreferrer"><img alt="youtube" src={youtube}/><p>YouTube</p></a>
                        <a href="https://www.instagram.com/jenico.flac/" target="_Blank" rel="noreferrer"><img alt="instagram" src={instagram}/><p>Instagram</p></a>
                    </div>
                </div>
            </header>
            <BackgroundVideo src={background}/>
        </div>
    );
}

export default Home;