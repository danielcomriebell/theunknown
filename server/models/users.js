let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');



var User = new Schema({
  username: String,
  password: String
});



User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
