const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/', BookController.index);
router.get('/:bookID', BookController.show); // Changed to GET request and added parameter for employeeID
router.post('/store', BookController.store);
router.put('/:bookID', BookController.update); // Changed to PUT request and added parameter for employeeID
router.delete('/:bookID', BookController.destroy); // Changed to DELETE request and added parameter for employeeID

module.exports = router;