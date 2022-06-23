const express = require('express');
const { Router } = express

const controller = require('../controllers/ProductoController')

const router= Router()

router.get('/', controller.get)
router.post('/', controller.post)


module.exports = router