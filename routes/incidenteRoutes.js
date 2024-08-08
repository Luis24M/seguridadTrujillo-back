const express = reqire('express');
const router = express.Router();
const Incidente = require('../models/Incidente');

router.get('/incidentes', async (req, res) => {
    try {
        const incidentes = await Incidente.findAll();
        res.json(incidentes);
    } catch (err) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los incidentes' });
    }
});

module.exports = router;