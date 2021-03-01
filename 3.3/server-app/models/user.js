const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    feeds: [{
        url: String
    }]
});

const User = mongoose.model('users', UserSchema);

module.exports = {
    Schema: UserSchema,
    User
};