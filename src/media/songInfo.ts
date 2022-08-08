import {art} from './images/index'
import { whereWeEnd, dreamingOfDetunedLove, lysergic, etherealEP, stormEP } from './music/index'
import { SongInfo } from '../Interface'

const songInfo: SongInfo[] = [
    {
        title: 'Where We End',
        art: art.whereWeEnd,
        songs: whereWeEnd,
        hyperlink: 'https://distrokid.com/hyperfollow/jenico/where-we-end'
    },
    {
        title: 'Dreaming of Detuned Love',
        art: art.dreamingOfDetunedLove,
        songs: dreamingOfDetunedLove,
        hyperlink: 'https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'
    },
    {
        title: 'Lysergic',
        art: art.lysergic,
        songs: lysergic,
        hyperlink: 'https://distrokid.com/hyperfollow/jenico/lysergic-2'
    },
    {
        title: 'Ethereal',
        art: art.ethereal,
        songs: etherealEP,
        hyperlink: 'https://distrokid.com/hyperfollow/jenico/ethereal'
    },
    {
        title: 'Storm EP',
        art: art.stormEP,
        songs: stormEP,
        hyperlink: 'https://distrokid.com/hyperfollow/jenico/storm-ep'
    }
];

export default songInfo