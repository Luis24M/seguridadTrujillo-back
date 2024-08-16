const express = require('express');
const router = express.Router();
const PuntoSeguro = require('../models/PuntoSeguro');
const verifyToken = require('../middlewares/authMiddleware');

// Crear un punto seguro
router.post('/crear-punto-seguro', verifyToken, async (req, res) => {
    const { id_tipo_punto_seguro, nombre, latitud, longitud, direccion, telefono, horario } = req.body;

    try {
        const puntoSeguro = await PuntoSeguro.create({
            id_tipo_punto_seguro,
            nombre,
            latitud,
            longitud,
            direccion,
            telefono,
            horario,
        });

        res.status(201).send('Punto seguro creado exitosamente');
    } catch (error) {
        console.error('Error al crear el punto seguro:', error);
        res.status(500).send('Error al crear el punto seguro');
    }
});

// Obtener todos los puntos seguros
router.get('/puntos-seguros', async (req, res) => {
    try {
        const puntosSeguros = await PuntoSeguro.findAll();
        res.status(200).json(puntosSeguros);
    } catch (error) {
        console.error('Error al obtener los puntos seguros:', error);
        res.status(500).send('Error al obtener los puntos seguros');
    }
});

// Actualizar un punto seguro
router.put('/actualizar-punto-seguro/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { id_tipo_punto_seguro, nombre, latitud, longitud, direccion, telefono, horario } = req.body;

    try {
        const puntoSeguro = await PuntoSeguro.findByPk(id);

        if (!puntoSeguro) {
            return res.status(404).send('Punto seguro no encontrado');
        }

        puntoSeguro.id_tipo_punto_seguro = id_tipo_punto_seguro;
        puntoSeguro.nombre = nombre;
        puntoSeguro.latitud = latitud;
        puntoSeguro.longitud = longitud;
        puntoSeguro.direccion = direccion;
        puntoSeguro.telefono = telefono;
        puntoSeguro.horario = horario;

        await puntoSeguro.save();

        res.status(200).send('Punto seguro actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el punto seguro:', error);
        res.status(500).send('Error al actualizar el punto seguro');
    }
});

// Eliminar un punto seguro
router.delete('/eliminar-punto-seguro/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const puntoSeguro = await PuntoSeguro.findByPk(id);

        if (!puntoSeguro) {
            return res.status(404).send('Punto seguro no encontrado');
        }

        await puntoSeguro.destroy();

        res.status(200).send('Punto seguro eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el punto seguro:', error);
        res.status(500).send('Error al eliminar el punto seguro');
    }
});

module.exports = router;

