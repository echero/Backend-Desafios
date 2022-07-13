const express = require('express')
const { Router } = express;
const router = Router();

const controller = require('../controllers/CarritoController')

router.post('/', controller.post)
router.delete('/:id', controller.delete)
router.post('/:id/productos', controller.post_producto)
router.get('/:id/productos', controller.get_productos)
router.delete('/:id/productos/:id_prod', controller.delete_producto)

module.exports = router