const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Asumiendo que el token viene en el header Authorization: Bearer <token>
  if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
  } catch (error) {
      console.error('Error verificando token:', error);
      res.status(403).json({ message: 'Token no válido' });
  }
};

module.exports = verifyToken;
