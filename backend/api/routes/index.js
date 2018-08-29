const { 
    startSession 
} = require ('../controllers');

module.exports = server => {
    server.route('/newSession').get(startSession);
}