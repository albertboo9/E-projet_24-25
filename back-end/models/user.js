const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    name : {type: String, require: true},
    email : {type: String, require: true, unique: true},
    password : {type: String, require: true}, 
    CreateAt: {type: Date, default: Date.now(),  require: true},
    updateAt: {type: Date, require: false},
    wallet: {type: String, require: false, unique: true}
}
)

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);