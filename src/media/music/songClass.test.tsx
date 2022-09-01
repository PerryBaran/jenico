import { Song } from "./index";

it('creates an object instace', () => {
    const song = new Song('');
    expect(song).toBeInstanceOf(Object);
});

describe('constructor', () => {
    it('initiates name', () => {
        const song = new Song('test', '', '');
        expect(song.name).toEqual('test');
    });

    it('can be initialised with no ref', () => {
        const song = new Song('');
        expect(song.ref).toBeUndefined();
    })

    it('can be initialised with ref', () => {
        const song = new Song('', 'test');
        expect(song.ref).toEqual('test');
    });

    it('can be initialised with no src', () => {
        const song = new Song('');
        expect(song.src).toBeUndefined();
    });

    it('can be initialsed with optional src', () => {
        const song = new Song('', undefined, 'test');
        expect(song.src).toEqual('test');
    });
});

describe('non readonly properties', () => {
    it('can change src later', () => {
        const song = new Song('');
        song.src = 'test';
        expect(song.src).toEqual('test');
    });
})