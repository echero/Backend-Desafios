const express = require('express');
const { Router } = express;
const router = Router();
const controller = require('../controllers/ProductoController')
const middlewareAdmin = require('../middleware/validarAdministrador')

router.get('/:id?', controller.get)
router.post('/', middlewareAdmin.esAdministrador, controller.post)
router.put('/:id', middlewareAdmin.esAdministrador, controller.put)
router.delete('/:id', middlewareAdmin.esAdministrador, controller.delete)

module.exports = router