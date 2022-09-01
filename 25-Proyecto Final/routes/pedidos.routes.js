const express = require('express')
const { Router } = express;
const router = Router();

const controller = require('../controller/pedidos')

router.get('/:id', controller.getAll)

module.exports = router