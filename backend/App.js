const server = require('./server');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const user = process.env.MLAB_USERNAME;
const pass = process.env.MLAB_PASSWORD;

mongoose.connect(`mongodb://${user}:${pass}@ds035137.mlab.com:35137/memorycards`)
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Error connecting to Mongo.', err));

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
