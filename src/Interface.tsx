interface Songs {
    name: string;
    src: string;
}

interface SongInfo {
    title: string;
    art: string;
    songs: Songs[];
}


export type {Songs, SongInfo}