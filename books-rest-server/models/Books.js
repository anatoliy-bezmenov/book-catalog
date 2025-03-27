const mongoose = require('mongoose');

const booksSchemma = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    year: {
        type: Number,
        validate: {
          validator: function (value) {
            return value > 0 ? value <= 2025 : value >= -5000;
          },
          message: "Enter a valid year (max 2025 AD, min 5000 BC).",
        },
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
    if (typeof this.year === "string") {
        const bcMatch = this.year.match(/^(\d{1,4})\s?(B\.?C)$/i);
        if (bcMatch) {
          this.year = -parseInt(bcMatch[1], 10); // Convert BC to negative
        } else {
          this.year = parseInt(this.year, 10); // Convert to number
        }
      }
});

const Books = mongoose.model('Books', booksSchemma);

module.exports = Books;