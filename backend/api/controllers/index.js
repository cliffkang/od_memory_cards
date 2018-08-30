const Session = require('../models/SessionModel');

const startSession = (req,res) => {
    // select a random 10
    const spanishWords = Object.keys(potentialWords);
    const len = spanishWords.length;
    const newSession = new Session;
    const taken = {};
    while (newSession.randomWords.length !== 10) {
        const randomWord = spanishWords[Math.floor(Math.random() * len)];
        if (taken[randomWord]) continue;
        newSession.randomWords.push({
            spanish: randomWord,
            english: potentialWords[randomWord],
            M: 1,
        });
        taken[randomWord] = 1;
    }
    
    // save session and send first word in array
    newSession.save()
        .then(saved => {
            const currentWord = saved.randomWords[0];
            const { _id } = saved;
            res.status(200).send({ currentWord, _id });
        })
        .catch(error => {
            res.status(500).send({ error });
        });
};

const nextWord = (req,res) => {
    const lastWord = req.body;
    const { _id } = lastWord;
    if (_id && lastWord) {
        Session.findOne({ _id })
            .then(result => {
                const { randomWords } = result;
                const moveBack = lastWord.currentWord.M;
                randomWords[0].M = moveBack;
                const moveWord = randomWords.shift();
                randomWords.splice(moveBack, 0, moveWord);
                Session
                    .findOneAndUpdate({ _id }, { randomWords }, { new: true })
                    .then(saved => {
                        const currentWord = saved.randomWords[0];
                        const { _id } = saved;
                        res.status(200).send({ currentWord, _id });
                    })
                    .catch(error => {
                        res.status(500).send({ error });
                    });
            })
            .catch(err => res.status(500).json({ error: 'Error updating the job', err }));
    } else {
        res.status(422).send('Please send valid id and/or word');
    }
}

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
    nextWord,
}