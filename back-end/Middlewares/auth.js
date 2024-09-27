const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; 
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Accès non autorisé');
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded; // Stocker les données utilisateur décodées pour le contrôle d'accès
      next();
    } catch (error) {
      res.status(403).send('Jeton invalide');
    }
}