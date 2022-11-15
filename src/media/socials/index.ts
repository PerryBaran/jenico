import spotify from "./Spotify.png";
import bandcamp from "./BandCamp.png";
import soundcloud from "./Soundcloud.png";
import youtube from "./Youtube.png";
import instagram from "./Instagram.png";

class Social {
  readonly name: string;
  readonly src: string;
  readonly href: string;

  constructor(name: string, src: string, href: string) {
    this.name = name;
    this.src = src;
    this.href = href;
  }
}

const socials = [
  new Social(
    "Spotify",
    spotify,
    "https://open.spotify.com/artist/6XqSoJQMIWNKBuLzzmJwiz"
  ),
  new Social("Bandcamp", bandcamp, "https://jenico.bandcamp.com/"),
  new Social("Soundcloud", soundcloud, "https://soundcloud.com/jenico_flac"),
  new Social(
    "YouTube",
    youtube,
    "https://www.youtube.com/channel/UCOHuR2EY8wKXsDcocxDvqOA"
  ),
  new Social("Instagram", instagram, "https://www.instagram.com/jenico.flac/"),
];

export default socials;
