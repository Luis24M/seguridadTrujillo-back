const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const nuevoUsuario = await Usuario.create(req.body);
    res.json(nuevoUsuario);
};
