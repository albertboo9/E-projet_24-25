const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const transactionSchema= mongoose.Schema({
    fromUserId: {type: String, require: true},
    toUserID: {type: String, require: true},
    amount: {type: Number, require: true},
    doneAt: {type: Date, require: true, default: Date.now()}
})

transactionSchema.plugin(uniqueValidator)

module.exports = mongoose.model('transaction', transactionSchema)