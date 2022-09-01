const express = require('express')
const { Router } = express;
const router = Router();

const controller = require('../controller/perfil')

router.get('/:id', controller.get)
router.put('/:id', controller.put)

module.exports = router