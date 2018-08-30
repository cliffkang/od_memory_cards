const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = mongoose.Schema(
    {
        randomWords: [{
            spanish: String,
            english: String,
            M: Number,
        }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Session', SessionSchema);
