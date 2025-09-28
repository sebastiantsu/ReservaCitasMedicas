// routes/auth.js
const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    // 1. Validar que el usuario exista
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email o contraseña incorrectos.');

    // 2. Validar que la contraseña sea correcta
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email o contraseña incorrectos.');

    // 3. Crear y firmar el token JWT
    const token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET
    );

    // 4. Enviar el token al frontend
    res.header('auth-token', token).send({ token: token });
});

// RUTA PARA REGISTRAR UN NUEVO USUARIO
router.post('/register', async (req, res) => {
    // 1. Validar si el email ya existe en la base de datos
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('El correo electrónico ya está registrado.');
    }

    // 2. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Crear un nuevo usuario con los datos recibidos
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    try {
        // 4. Guardar el usuario en la base de datos
        const savedUser = await user.save();
        res.send({ user: user._id, message: 'Usuario registrado con éxito.' });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;