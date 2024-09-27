const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tontineSchema = mongoose.Schema({
    name: {type: String, require: true},
    description : {type: String, require: true},
    code: {type: String, require: true, unique: true},
    adminID: {type: String, require: true},
    createAt: {type: String, default: Date.now(),  require: true},
    updateAt: {type: String, require: false},
    Members:  [{
        MemberName: {type: String, require: true},
        MemberId: {type: String, require: true}
    }]
})

tontineSchema.plugin(uniqueValidator)

module.exports = mongoose.model('tontine', tontineSchema);