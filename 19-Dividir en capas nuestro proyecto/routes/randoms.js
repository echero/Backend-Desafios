const { Router } = require('express');
const {numRandoms} = require('../controller/randoms');


const router = Router();

router.get('/', numRandoms)


module.exports = router;