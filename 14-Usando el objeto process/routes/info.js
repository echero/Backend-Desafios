const { Router } = require('express');
const {informacion} = require('../controller/info');


const router = Router();

router.get('/', informacion)


module.exports = router;