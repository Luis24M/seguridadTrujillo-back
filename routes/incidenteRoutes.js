const express = require('express');
const router = express.Router();
const Incidente = require('../models/Incidente');
const verifyToken = require('../middlewares/authMiddleware');

// Reportar incidente
router.post('/reportar-incidente', verifyToken, async (req, res) => {
    const { id_tipo_incidente, latitud, longitud, direccion, descripcion } = req.body;
    const uid = req.uid;

    try {
        await Incidente.create({
            uid,
            id_tipo_incidente,
            latitud,
            longitud,
            direccion,
            descripcion,
        });

        res.status(201).send('Incidente reportado exitosamente');
    } catch (error) {
        console.error('Error al reportar el incidente:', error);
        res.status(500).send('Error al reportar el incidente');
    }
});

module.exports = router;
