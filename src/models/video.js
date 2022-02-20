const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    url: String,
    thumbnail: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('Video', VideoSchema);