const express = require('express');
const router = express.Router();

const { login, cadastrar } = require('../controladores/auth');

router.post('/login', login);
router.post('/cadastro', cadastrar);

module.exports = router;