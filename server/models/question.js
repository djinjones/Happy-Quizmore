const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const questionSchema = new Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    }
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;