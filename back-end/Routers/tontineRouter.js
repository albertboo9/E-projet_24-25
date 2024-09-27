const express = require('express');
const tontineRouter = express.Router();

const tontineCrtl = require('../Controllers/tontineCtrl')
const auth =  require('../Middlewares/auth')

tontineRouter.post('/home/tontine',auth, tontineCrtl.create);
tontineRouter.delete('/home/tontine',auth, tontineCrtl.delete);
tontineRouter.get('/home/tontine',auth, tontineCrtl.update);

module.exports = tontineRouter;