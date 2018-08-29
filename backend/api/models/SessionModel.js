const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = mongoose.Schema(
  {
    randomWords: [{
      english: String,
      M: Number,
    }],
    index: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Session', SessionSchema);
