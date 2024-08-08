const express = require('express');
const router = express.Router();
const TipoIncidente = require('../models/TipoIncidente');

router.get('/tipos-incidente', async (req, res) => {
    try {
        const tiposIncidente = await TipoIncidente.findAll();
        res.json(tiposIncidente);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los tipos de incidente' });
    }
});

module.exports = router;