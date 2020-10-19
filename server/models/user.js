const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    photo: {type: String, default: 'https://otzovik-dialine.ru/images/dialain/engels/avatar_question_round.png'},
    name: {type: String, required: true}
});


module.exports = model('User', schema);