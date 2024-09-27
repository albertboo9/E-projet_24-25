const express = require('express')
const transactionRouter = express.Router()
const auth = require('../Middlewares/auth');

const transactionCtrl = require('../Controllers/transactionCtrl');

transactionRouter.post('/home/depot', auth, transactionCtrl.makeDeposit)
transactionRouter.post('/home/retrait',atuh,  transactionCtrl.makeWithdrawal)

module.exports = transactionRouter;