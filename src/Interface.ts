interface Songs {
    readonly name: string;
    src?: string;
    readonly ref?: string;
};

interface SongInfo {
    readonly title: string;
    readonly art: string;
    readonly songs: Songs[];
    readonly hyperlink: string;
};

export type {Songs, SongInfo};