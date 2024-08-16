const admin = require('firebase-admin');

// Inicializar la app de Firebase Admin (asegúrate de tener las credenciales correctas)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // o usa `admin.credential.cert(serviceAccount)` si tienes un archivo de credenciales
  });
}

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;
