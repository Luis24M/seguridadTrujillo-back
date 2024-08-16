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

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Actualizar usuario
router.put('/actualizar-usuario', async (req, res) => {
    const uid = req.uid;
    const { nombre, apellido, email, contrasena, telefono } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { uid } });

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.contrasena = contrasena;
        usuario.telefono = telefono;

        await usuario.save();

        res.status(200).send('Usuario actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send('Error al actualizar el usuario');
    }
});

// Eliminar usuario
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const usuario = await Usuario.findOne({ where: { uid } });

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        await Usuario.destroy({ where: { uid } });

        // Eliminar usuario de Firebase
        await admin.auth().deleteUser(uid);

        res.status(200).send('Usuario eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
});

module.exports = router;
