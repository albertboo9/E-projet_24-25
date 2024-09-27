
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fb = require('../firebaseConfig')
db = fb.firestore()


exports.signup = (req, res, next) => {
    date = new Date()
    const user = {
        email: req.body.email,
        name: req.body.name,
        userId: req.body.userId,
        createAt : date,
        wallet: req.body.wallet,
        notification: req.body.notification,
        tontines: [],
    }

    const response =  db.collection("utilisateurs").doc(req.body.userId).set(user)
    res.send(response)
    .then(()=> res.status(201).json({message: "utilisateur créé avec succès"}))
    .catch(error => res.status(401).json(error));
    
}

exports.login = async (req, res, next) => {
    const { idToken } = req.body;
    console.log(req.body);
    const secret = 'SUPERTONTINE_SECRET_KEY'
    try {
      const decodedToken = await fb.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid; // Extraire l'ID utilisateur du jeton d'identification vérifié
  
      // Générer un jeton JWT à l'aide de l'uid (expliqué plus tard)
      const token = jwt.sign({ uid }, secret, { expiresIn: '1h' });
  
      res.json({ token });
      console.log(token)
    } catch (error) {
      console.error(error);
      res.status(401).send('Jeton d\'identification invalide');
    }
}

exports.updateProfile = (req, res, next) => {
    
}