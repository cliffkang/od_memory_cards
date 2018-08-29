
const startSession = (req,res) => {
    // select a random 10
    const spanishWords = Object.keys(potentialWords);
    const len = spanishWords.length;
    const randomWords = [];
    const taken = {};
    while (randomWords.length !== 10) {
        const randomWord = spanishWords[Math.floor(Math.random() * len)];
        if (taken[randomWord]) continue;
        randomWords.push({
            spanish: randomWord,
            english: potentialWords[randomWord],
            M: 1,
        });
        taken[randomWord] = 1;
    }


};

const potentialWords = {
    'buenos dias': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good evening',
    'estoy bien': 'i am fine',
    'mucho gusto': 'nice to meet you',
    'hasta luego': 'see you later',
    'adios': 'goodbye',
    'perdoname': 'excuse me',
    'gracias': 'thank you',
    'lo siento': 'i\'m sorry',
    'salud': 'bless you',
    'yo tengo hambre': 'i am hungry',
    'si': 'yes',
    'no': 'no',
    'de nada': 'you are welcome',
    'yo no comprendo': 'i do not understand',
    'estudiente': 'student',
    'escuela': 'school',
    'musica': 'music',
    'arte': 'art',
    'profesor': 'professor',
    'maestro': 'teacher',
};

module.exports = {
    startSession,
}