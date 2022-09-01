import { Songs } from '../../Interface';

class Song implements Songs {
    readonly name: string;
    readonly ref?: string;
    src?: string;
    constructor(name: string, ref?: string, src?: string) {
        this.name = name
        this.ref = ref
        this.src = src
    };
};

const whereWeEnd = [new Song('Where We End', 'Where We End/Where We End.mp3')];

const dreamingOfDetunedLove = [
    new Song('Slumber', 'Dreaming Of Detuned Love/Slumber.mp3'), 
    new Song('Your Careless Embrace', 'Dreaming Of Detuned Love/Your Careless Embrace.mp3'), 
    new Song('Restless Thoughts', 'Dreaming Of Detuned Love/Restless Thoughts.mp3'),
    new Song('Detuned Love', 'Dreaming Of Detuned Love/Detuned Love.mp3'),
    new Song('Falling into the Void', 'Dreaming Of Detuned Love/Falling into the Void.mp3')
];

const lysergic = [new Song('Lysergic', 'Lysergic/Lysergic.mp3')];

const ethereal = [
    new Song('Distressed', 'Ethereal/Distressed.mp3'),
    new Song('Impurity','Ethereal/Impurity.mp3'),
    new Song('Achlys', 'Ethereal/Achlys.mp3'),
    new Song('Ethereal', 'Ethereal/Ethereal.mp3')
];

const stormEP = [
    new Song('Serene', 'Storm EP/Serene.mp3'),
    new Song('Cumulonimbus', 'Storm EP/Cumulonimbus.mp3'),
    new Song('Rainfall', 'Storm EP/Rainfall.mp3'),
    new Song('Thunder', 'Storm EP/Thunder.mp3'),
    new Song('Dissipate', 'Storm EP/Dissipate.mp3')
];

export { whereWeEnd, dreamingOfDetunedLove, lysergic, ethereal as etherealEP, stormEP, Song };