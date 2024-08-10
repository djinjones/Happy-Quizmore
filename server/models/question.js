const mongoose = require('mongoose');

const { Schema } = mongoose;


const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;