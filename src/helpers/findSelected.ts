import { SongInfo } from "../Interface";

function findSelectedSong(name: string, data: SongInfo[]) {
  for (const album of data) {
    for (const song of album.songs) {
      if (song.name === name) {
        return song;
      }
    }
  }
}

function findSelectedAlbum(name: string, data: SongInfo[]) {
  for (const album of data) {
    for (const song of album.songs) {
      if (song.name === name) {
        return album;
      }
    }
  }
}

export { findSelectedSong, findSelectedAlbum };
