const server = require('./server');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/memoryCard')
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Error connecting to Mongo.', err));

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
