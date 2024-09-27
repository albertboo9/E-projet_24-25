exports.sendNotification = (req, res, next) =>{
    
}

exports.readNotification = (req, res, next )=>{

}

exports.deleteNotification = (req, res, next) =>{

}


exports.getNotificationsForUser = async (req, res, next) => {
    // Extraire l'ID utilisateur des paramètres de la requête
    const receiverId = req.params.userId;
  
    // Valider les données d'entrée
    if (!receiverId) {
      return res.status(400).send('Identifiant d\'utilisateur manquant.');
    }
  
    try {
      // Créer une requête pour filtrer les notifications par receiverId
      const notificationsQuery = db.collection('notifications').where('receiverId', '==', receiverId);
  
      // Exécuter la requête et récupérer les documents de notification
      const notificationDocs = await notificationsQuery.get();
  
      // Préparer un tableau pour stocker les données de notification
      const notifications = [];
  
      // Parcourir chaque document de notification
      notificationDocs.forEach((doc) => {
        const notificationData = doc.data();
  
        // Marquer la notification comme lue si elle ne l'a pas déjà été
       /* if (notificationData.read === false) {
          doc.ref.update({ read: true });
        }*/
  
        // Ajouter les données de notification au tableau
        notifications.push(notificationData);
      });
  
      // Envoyer les notifications récupérées dans la réponse
      res.status(200).send(notifications);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications pour l\'utilisateur:', error);
      res.status(500).send('Échec de la récupération des notifications.');
    }
  };
  

