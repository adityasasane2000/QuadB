const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/",controller.getData);

module.exports = router;