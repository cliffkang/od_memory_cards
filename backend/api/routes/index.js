const { 
    startSession,
    nextWord,
} = require ('../controllers');

module.exports = server => {
    server.route('/newSession').get(startSession);
    server.route('/nextWord').post(nextWord);
}