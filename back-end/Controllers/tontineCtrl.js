// const { Timestamp } = require('mongodb');
const fb = require('../firebaseConfig');
const db = fb.firestore();
const {v4:uuid4} = require('uuid');
const { FieldValue} = require('firebase-admin/firestore');

exports.create = (req, res, next) => {
  let date = new Date()
  const rules = req.body.rules
  const code = uuid4() // code d'invitation de la tontine
  console.log(rules)
  const members = req.body.members
  console.log(members);

   const tontineJson = {
          name : req.body.name,
          description: req.body.description, 
          createAt:  date,
          rules:rules,
          code : code,
          startDate: req.body.startDate,
          adminId: req.body.adminId,
          members:members

      }
      const response = db.collection("Tontines").add(tontineJson)
      res.send(response);
}

exports.update = (req, res, next) =>{
    res.json({message: "update la tontine"})
}

exports.delete = (req, res, next) =>{
    
}

exports.join = async (req, res) => {
  const invitationCode = req.body.code;
  const userId = req.body.userId;

  // References Firestore collections
  const tontinesRef = db.collection('Tontines');
  const usersRef = db.collection('utilisateurs');

  try {
    // Validation du code d'invitation
    const tontineSnapshot = await tontinesRef
      .where('code', '==', invitationCode)
      .limit(1)
      .get();

    if (tontineSnapshot.empty) {
      throw new Error('Code d\'invitation invalide'); 
    }

    const tontineDoc = tontineSnapshot.docs[0];
    const tontineId = tontineDoc.id;
    const tontineData = tontineDoc.data();

    // verifier si l'utilisateur est invité
    const isInvited = tontineData.inviteMembers.includes(userId);
    if (!isInvited) {
      throw new Error('L\'utilisateur n\'est pas invité à cette tontine'); 
    }

    // vérifions s'il est déjà membre
    const isMember = await usersRef
      .doc(userId)
      .collection('tontines')
      .where('tontineId', '==', tontineId)
      ;

    if (isMember.exists) {
      throw new Error('L\'utilisateur est déjà membre de cette tontine'); 
    }

    // recupérer les informations de l'utilisateur
    const userSnapshot = await usersRef.doc(userId).get();
    if (userSnapshot.empty) {
      throw new Error('Utilisateur introuvable');
    }
    const userData = userSnapshot.data();

    
    const transaction = await db.runTransaction(async (transaction) => {
      const tontineRef = db.collection('Tontines').doc(tontineId); 
      const userRef = db.collection('utilisateurs').doc(userId); 

      await tontineRef.update({
        members: FieldValue.arrayUnion(userData), //ajout du nouveau membres à la tontine
      });

      await userRef.update({
        tontines: FieldValue.arrayUnion(tontineId), // on ajoute l'Id de la tontine dans le champ tontines de l'utilisaeteur
      });
    });
    const notificationsRef = db.collection('notifications');
        // Créez une notification d'invitation pour l'invité
        const notificationRef = notificationsRef.doc();
        await notificationRef.set({
          senderId: userId,
          receiverId: userId,
          message: `Vous venez de rejoindre la tontine " ${tontineData.name} " `,
          timestamp: FieldValue.serverTimestamp(),
          isRead: false
        });
    

   
    res.status(200).send(`L'utilisateur ${userId} a rejoint la tontine ${tontineData.name}`);
  } catch (error) {
    console.error('Erreur lors de l\'adhésion à la tontine :', error);
    res.status(400).send(error.message); 
  }
};

exports.invite = async (req, res) => {
  const friendId = req.body.friendId; // ID de l'invité
  const code = req.body.code; // Code d'invitation
  const senderId = req.body.senderId; // ID de l'expéditeur

  // On référence les collections Firestore
  const tontinesRef = db.collection('Tontines');
  const usersRef = db.collection('utilisateurs');
  const notificationsRef = db.collection('notifications');

  try {
    // On valide le code d'invitation et récupérez les données de la tontine
    const tontineDoc = await tontinesRef.where('code', '==', code).limit(1).get();
    if (tontineDoc.empty) {
      throw new Error('Code d\'invitation invalide');
    }
    const tontineData = tontineDoc.docs[0].data();
    const tontineId = tontineDoc.docs[0].id;

    const inviteDoc = await usersRef.doc(friendId).get();

if (!inviteDoc.exists) {
  throw new Error('Utilisateur introuvable'); // User not found
}

    // Vérifiez si l'expéditeur est un administrateur 
    const isAdmin = await tontinesRef.doc(tontineId).get().then((doc) => {
      if (doc.exists) {
        const admins = doc.data().adminIds;
        return admins.includes(senderId);
      } else {
        return false;
      }
    });

    if (!isAdmin) {
      throw new Error('Vous n\'êtes pas administrateur de cette tontine');
    }

    
    /* const isMember = tontinesRef.where('members', 'array-contains-any', [
      { userId: friendId },
    ]);
    ;

    if (isMember.exists) {
      // Si l'invité est déjà membre, envoyez une réponse appropriée
      res.status(200).send(`L'utilisateur "${inviteeData.name}" est déjà membre de la tontine "${tontineData.name}".`);
      return; // Sortez de la fonction si l'invité est déjà membre
    }*/

    // on vérifie si le destinataire a déjà été invité
    const isPreviouslyInvited = tontineData.inviteMembers && tontineData.inviteMembers.includes(friendId);
    if (isPreviouslyInvited) {
      throw new Error('L\'utilisateur a déjà été invité à rejoindre cette tontine');
    }

    // on vérifie si le destinataire est déjà membres
 

    // Récupérez les informations de l'invité et de l'expéditeur
    const inviteeDoc = await usersRef.doc(friendId).get();
    if (inviteeDoc.empty) {
      throw new Error('Invité introuvable');
    }
    const inviteeData = inviteeDoc.data();

    // Créez une notification d'invitation pour l'invité
    const notificationRef = notificationsRef.doc();
    await notificationRef.set({
      sender:'SuperTontine',
      senderId: senderId,
      receiverId: friendId,
      message: `Vous avez été invité à rejoindre la tontine " ${tontineData.name} " dont le code d'invitation est: ${tontineData.code}`,
      timestamp: FieldValue.serverTimestamp(),
      isRead: false
    });

    // Mettez à jour le tableau inviteMembers de la tontine 
    if (tontineData.inviteMembers) {
      await tontinesRef.doc(tontineId).update({
        inviteMembers: FieldValue.arrayUnion(friendId),
      });
    }

    res.status(200).send(`Invitation envoyée à ${inviteeData.name}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'invitation :', error);
    res.status(400).send(error.message);
  }
};

exports.makeadmin = async (req, res) => {
  const creatorId = req.body.creatorId; 
  const newAdminId = req.body.newAdminId; 
  const tontineId = req.body.tontineId; 

  // Reference Firestore 
  const tontinesRef = db.collection('Tontines');

  try {

    // on réference la tontine
    const tontineDoc = await tontinesRef.doc(tontineId).get();

    //on vérifie si la tontine existe
    if (!tontineDoc.exists) {
      throw new Error('Tontine introuvable'); 
    }

    // on verifie si l'utilisateur qui lance la demande est un admin de cette tontine
    const isCreatorAdmin = await tontineDoc.data().adminIds.includes(creatorId);
    if (!isCreatorAdmin) {
      throw new Error('L\'utilisateur n\'est pas administrateur de cette tontine'); 
    }

    // on vérifie si l'utilisateur est déjà admin
    const isAdmin = await tontineDoc.data().adminIds.includes(newAdminId);
    if (isAdmin) {
      throw new Error('L\'utilisateur est déjà administrateur');
    }

    // on reference le tableau qui comporte les Id des admins
    const adminIds = tontineDoc.data().adminIds;

    // on y ajoute l'id du nouvel admin
    adminIds.push(newAdminId);

    // maintenant on met à jour les admin de la tontine
    await tontinesRef.doc(tontineId).update({ adminIds });

    // puis on crée une notificatoin de succès qui seras envoyé au nouvel admin
    const notificationRef = notificationsRef.doc();
    await notificationRef.set({
      sender:'SuperTontine',
      senderId: creatorId,
      receiverId: newAdminId,
      message: `Vous êtes desormais Admin de la tontine " ${tontineData.name} "`,
      timestamp: FieldValue.serverTimestamp(),
      isRead: false
    });

   
    res.status(200).send(`L'utilisateur "${newAdminId}" a été promu administrateur de la tontine "${tontineDoc.data().name}".`);
  } catch (error) {
    console.error('Erreur lors de la promotion de l\'utilisateur en administrateur:', error);
    res.status(400).send(error.message);
  }
};