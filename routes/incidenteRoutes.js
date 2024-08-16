const express = require('express');
const router = express.Router();
const Incidente = require('../models/Incidente');
const TipoIncidente = require('../models/TipoIncidente');
const Usuario = require('../models/Usuario');
const verifyToken = require('../middlewares/authMiddleware');

// Reportar incidente
router.post('/reportar-incidente', verifyToken, async (req, res) => {
    const { uid, id_tipo_incidente, latitud, longitud, direccion, descripcion } = req.body;


    try {
        await Incidente.create({
            uid,
            id_tipo_incidente,
            latitud,
            longitud,
            descripcion,
        });

        res.status(201).send('Incidente reportado exitosamente');
    } catch (error) {
        console.error('Error al reportar el incidente:', error);
        res.status(500).send('Error al reportar el incidente');
    }
});

// Obtener incidentes
router.get('/', async (req, res) => {
    try {
        const incidentes = await Incidente.findAll();
        
        // enviar los incidentes como respuesta y agregar el nombre del tipo de incidente
        const respuesta = await Promise.all(incidentes.map(async incidente => {
            // separar fecha y hora
            const fecha = incidente.fecha_hora.toISOString().split('T')[0];
            const hora = incidente.fecha_hora.toISOString().split('T')[1].split('.')[0];
            const tipoIncidente = await TipoIncidente.findByPk(incidente.id_tipo_incidente);
            const usuario = await Usuario.findOne({ where: { uid: incidente.uid } });
            return {
                id_incidente: incidente.id_incidente,
                id_tipo_incidente: incidente.id_tipo_incidente,
                tipo_incidente: tipoIncidente.nombre,
                latitud: incidente.latitud,
                longitud: incidente.longitud,
                descripcion: incidente.descripcion,
                fecha,
                hora,
                nombre_usuario: `${usuario.nombre} ${usuario.apellido}`,
                telefono_usuario: usuario.telefono,
        }},));
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener los incidentes:', error);
        res.status(500).send('Error al obtener los incidentes');
    }
});

// Actualizar un incidente
router.put('/actualizar-incidente/:id', async (req, res) => {
    const { id } = req.params;
    const { id_tipo_incidente, latitud, longitud, descripcion } = req.body;

    try {
        const incidente = await Incidente.findByPk(id);

        if (!incidente) {
            return res.status(404).send('Incidente no encontrado');
        }

        await incidente.update({
            id_tipo_incidente,
            latitud,
            longitud,
            descripcion,
        });

        res.status(200).send('Incidente actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el incidente:', error);
        res.status(500).send('Error al actualizar el incidente');
    }
});

// Eliminar un incidente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const incidente = await Incidente.findByPk(id);

        if (!incidente) {
            return res.status(404).send('Incidente no encontrado');
        }

        await incidente.destroy();

        res.status(200).send('Incidente eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el incidente:', error);
        res.status(500).send('Error al eliminar el incidente');
    }
});

module.exports = router;
