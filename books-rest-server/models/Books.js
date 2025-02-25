const mongoose = require('mongoose');

const booksSchemma = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: [1900, 'Minimum year should be 1900'],
        max: [2025, 'Maximum year should be 2025'],
    },
    genre: {
        type: String,
        minLength: [1, 'Genre should be at least 1 character'],
        required: true,
    },
    author: {
        type: String,
        minLength: [1, 'Author should be at least 1 character'],
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters'],
        required: true,
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid image url'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
});

booksSchemma.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    };
});

const Books = mongoose.model('Books', booksSchemma);

module.exports = Books;