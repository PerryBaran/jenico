import art from './media/images/index'
import { whereWeEnd, dreamingOfDetunedLove, lysergic, etherealEP, stormEP } from './media/music/index'
import { SongInfo } from './Interface'

const songInfo: SongInfo[] = [
    {
        title: 'Where We End',
        art: art.whereWeEnd,
        songs: whereWeEnd
    },
    {
        title: 'Dreaming of Detuned Love',
        art: art.dreamingOfDetunedLove,
        songs: dreamingOfDetunedLove
    },
    {
        title: 'Lysergic',
        art: art.lysergic,
        songs: lysergic
    },
    {
        title: 'Ethereal',
        art: art.ethereal,
        songs: etherealEP
    },
    {
        title: 'Storm EP',
        art: art.stormEP,
        songs: stormEP
    }

]

export default songInfo