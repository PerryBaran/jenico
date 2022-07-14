interface Songs {
    name: string;
    src: string;
}

interface SongInfo {
    title: string;
    art: string;
    songs: Songs[];
    hyperlink: string;
}


export type {Songs, SongInfo}