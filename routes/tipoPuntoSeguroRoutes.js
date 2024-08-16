const express = require('express');
const router = express.Router();
const TipoPuntoSeguro = require('../models/TipoPuntoSeguro');

router.get('/', async (req, res) => {
    try {
        const tiposIncidente = await TipoIncidente.findAll();
        res.json(tiposIncidente);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los tipos de incidente' });
    }
});

module.exports = router;