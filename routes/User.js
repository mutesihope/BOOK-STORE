const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isSecure = require("../Middleware/studentAutho")

router.get('/', UserController.index);
router.get('/:userID', UserController.show);
router.post('/create', UserController.store);
router.post('/login', UserController.userLogin);
router.put('/:userID', UserController.update);
router.delete('/:userID', UserController.destroy);

module.exports = router;