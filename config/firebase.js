const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json'); // Ajusta la ruta según la ubicación de tu archivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
