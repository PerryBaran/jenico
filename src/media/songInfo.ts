import {art} from './images/index'
import { whereWeEnd, dreamingOfDetunedLove, lysergic, etherealEP, stormEP } from './music/index'
import { Songs, SongInfo } from '../Interface'

class Album implements SongInfo {
    readonly title: string
    readonly art: string
    readonly songs: Songs[]
    readonly hyperlink: string
    constructor (title: string, art: string, songs: Songs[], link: string) {
        this.title = title
        this.art = art
        this.songs = songs
        this.hyperlink = link
    };
};

const songInfo = [
    new Album(
        'Where We End',
        art.whereWeEnd,
        whereWeEnd,
        'https://distrokid.com/hyperfollow/jenico/where-we-end'
    ),
    new Album(
        'Dreaming of Detuned Love',
        art.dreamingOfDetunedLove,
        dreamingOfDetunedLove,
        'https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'
    ),
    new Album(
        'Lysergic',
        art.lysergic,
        lysergic,
        'https://distrokid.com/hyperfollow/jenico/lysergic-2'
    ),
    new Album(
        'Ethereal',
        art.ethereal,
        etherealEP,
        'https://distrokid.com/hyperfollow/jenico/ethereal'
    ),
    new Album(
        'Storm EP',
        art.stormEP,
        stormEP,
        'https://distrokid.com/hyperfollow/jenico/storm-ep'
    )
];

export default songInfo