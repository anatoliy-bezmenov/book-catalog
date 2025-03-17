const mongoose = require('mongoose');

const booksSchemma = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    year: {
        type: Number,
        max: [2025, 'Maximum year should be 2025'],
    },
    genre: {
        type: String,
        minLength: [1, 'Genre should be at least 1 character'],
        required: true,
    },
    author: {
        type: String,
        required: false,
        validate: {
            validator: (v) => !v || v.length > 0, // Allow empty string but require non-empty if provided
            message: 'Author should not be an empty string.'
        },
        // minLength: [1, 'Author should be at least 1 character'],
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

booksSchemma.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    };
});

const Books = mongoose.model('Books', booksSchemma);

module.exports = Books;