const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    userId: {type: String, require: true},
    message: {type: String, require: true},
    createAt: {type: Date, require: true}
})

module.exports = mongoose.model('notifications', notificationSchema)