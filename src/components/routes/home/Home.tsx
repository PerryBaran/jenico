import React from 'react';
import BackgroundVideo from '../../background/video/BackgroundVideo';
import { background } from '../../../media/videos/index';
import { spotify, bandcamp, soundcloud, youtube, instagram} from '../../../media/icons/index';
import style from "./home.module.css";
import Socials from './socials/Socials';

function Home() {
    return (
        <div>
            <header className={style.container}>
                <div>
                    <h1>Jenico</h1>
                    <div>
                        <Socials src="https://open.spotify.com/artist/6XqSoJQMIWNKBuLzzmJwiz" img={spotify} name="Spotify"/>
                        <Socials src="https://jenico.bandcamp.com/" img={bandcamp} name="Bandcamp"/>
                        <Socials src="https://soundcloud.com/jenico_flac" img={soundcloud} name="Soundcloud"/>
                        <Socials src="https://www.youtube.com/channel/UCOHuR2EY8wKXsDcocxDvqOA" img={youtube} name="YouTube"/>
                        <Socials src="https://www.instagram.com/jenico.flac/" img={instagram} name="Instagram"/>
                    </div>
                </div>
            </header>
            <BackgroundVideo src={background}/>
        </div>
    );
}

export default Home;