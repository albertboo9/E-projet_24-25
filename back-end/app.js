const express = require('express');
// const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const tontineCtrl = require('./Controllers/tontineCtrl')
const userCtrl = require('./Controllers/userCtrl')
const auth = require('./Middlewares/auth')
const fb = require('./firebaseConfig')


//middlewares
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'], // url du front end
    credentials: true // accès au cookies
  }))
app.use(express.urlencoded({extended: true}))



app.post('/createtontine',auth, tontineCtrl.create);
app.post('/createuser', userCtrl.signup);
app.post('/login', userCtrl.login);
app.post('/jointontine',auth,  tontineCtrl.join);
app.post('/invitemembers',auth,  tontineCtrl.invite);
app.post('/promoteadmin',auth,  tontineCtrl.makeadmin);



/*{
    "name":"SuperTontine",
    "desciption":"tontine des jeunes developpeurs de la SuperTontine",
    "startDate":"01/01/2025",
    "rules":{
        "rule 1":"il faut payer avant dans les delais",
        "rule 2":"payer après le delai est passible d'une amende de 3500",
        "rule 3":"ne jamais vidé son compte épargne"
    }
}*/

//connexion à firebase


module.exports = app;