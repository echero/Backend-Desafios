const express = require('express');
const { Router } = express

const controller = require('../controllers/ProductoController')

const router= Router()

router.get('/', controller.get)
router.get('/:id', controller.id)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)

module.exports = router