const express = require('express');
const router = express.Router();
const PuntoSeguro = require('../models/PuntoSeguro');

router.get('/puntos-seguros', async (req, res) => {
    try {
        const puntosSeguros = await PuntoSeguro.findAll();
        res.json(puntosSeguros);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los puntos seguros' });
    }
});

module.exports = router;