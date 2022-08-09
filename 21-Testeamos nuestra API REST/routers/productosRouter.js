const express = require('express')
const productosController = require('../controllers/productosController')
const router = express.Router();

router.get('/', productosController.getProductos);
router.get('/:id', productosController.getProductosId);
router.post('/', productosController.saveProducto);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
