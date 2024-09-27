const express = require('express');
const notificationCtrl = require('../Controllers/notificationCtrl')
const notificationRouter = express.Router();

notificationRouter.post('/home', notificationCtrl.sendNotification)

module.exports = notificationRouter;
