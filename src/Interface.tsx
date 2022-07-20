interface Songs {
    name: string;
    src?: string;
    ref?: string;
}

interface SongInfo {
    title: string;
    art: string;
    songs: Songs[];
    hyperlink: string;
}


export type {Songs, SongInfo}