const express = require('express');
const router = express.Router();

const { 
    pegarTodosOsVeiculos, 
    veiculoEspecifico 
} = require('../controladores/veiculos');

router.get('/', pegarTodosOsVeiculos);
router.get('/:id', veiculoEspecifico);

module.exports = router;