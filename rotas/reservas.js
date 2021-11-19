const express = require('express');
const router = express.Router();

const { todasAsReservas, novaReserva, alterarReserva } = require('../controladores/reservas');

// Autenticação necessária
router.get('/', todasAsReservas);       // Minhas reservas
router.post('/', novaReserva);          // Nova reserva
router.patch('/:id', alterarReserva);   // Alterar reserva
module.exports = router;