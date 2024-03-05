const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const isSecure = require("../Middleware/AdminAutho")

router.get('/', isSecure, BookController.index);
router.get('/:bookID', isSecure, BookController.show);
router.post('/store', isSecure, BookController.store);
router.put('/:bookID', isSecure, BookController.update);
router.delete('/:bookID', isSecure, BookController.destroy);

module.exports = router;