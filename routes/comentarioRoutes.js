const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');

router.get('/comentarios', async (req, res) => {
    try {
        const comentarios = await Comentario.findAll();
        res.json(comentarios);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los comentarios' });
    }
});

module.exports = router;