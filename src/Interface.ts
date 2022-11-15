interface Songs {
  readonly name: string;
  readonly ref?: string;
  src?: string;
}

interface SongInfo {
  readonly title: string;
  readonly art: string;
  readonly songs: Songs[];
  readonly hyperlink: string;
}

export type { Songs, SongInfo };
