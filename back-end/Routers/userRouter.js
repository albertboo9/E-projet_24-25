const express = require('express');
const userRouter = express.Router();
const userCtrl = require('../Controllers/userCtrl.js');


userRouter.post('/', userCtrl.signup);
//userRouter.post('/', userCtrl.login);
//userRouter.post('/', userCtrl.updateProfile);

module.exports = userRouter