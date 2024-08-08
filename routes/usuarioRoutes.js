const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los usuarios' });
    }
});

// Otros endpoints relacionados a 'usuarios' podrían ir aquí

module.exports = router;
