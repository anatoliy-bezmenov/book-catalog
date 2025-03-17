const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name should be at least 5 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email should be at least 10 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password should be at least 4 characters'],
    },
    createdBooks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Books',
    }],
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;