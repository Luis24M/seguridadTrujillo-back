const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');
const Usuario = require('../models/Usuario');
const verifyToken = require('../middlewares/authMiddleware');

// Registro
router.post('/registro', async (req, res) => {
    const { nombre, apellido, email, contrasena, telefono } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password: contrasena,
            displayName: `${nombre} ${apellido}`,
            phoneNumber: telefono,
        });

        await Usuario.create({
            uid: userRecord.uid,
            nombre,
            apellido,
            email,
            contrasena,
            telefono,
        });

        res.status(201).send('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});

// Login
router.post('/login', verifyToken, async (req, res) => {
    const uid = req.uid;

    try {
        const usuario = await Usuario.findOne({ where: { uid } });

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json({
            uid: usuario.uid,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            fecha_registro: usuario.fecha_registro,
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error en el inicio de sesión');
    }
});

module.exports = router;
