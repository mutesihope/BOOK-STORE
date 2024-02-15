const Book = require('../models/Book');

// function to show the list of books
const index = (req, res, next) => {
    Book.find()
        .then(books => {
            res.json({
                books: books
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching books'
            });
        });
};

// function to show the details of a single employee by using book ID
const show = (req, res, next) => {
    let bookID = req.params.bookID;
    Book.findById(bookID)
        .then(book => {
            if (!book) {
                return res.status(404).json({
                    message: 'book not found'
                });
            }
            res.json({
                book: book
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching book details'
            });
        });
};

// function to add a book to the database
const store = (req, res, next) => {
    let book = new Book({
        name: req.body.name,
        genre: req.body.genre,
        author: req.body.author,
        cover: req.body.cover
    });
    book.save()
        .then(savedBook => {
            res.status(201).json({
                message: 'Book added successfully',
                book: savedBook
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while adding a book'
            });
        });
};

// function to update a book in the database using employee ID
const update = (req, res, next) => {
    let bookID = req.params.bookID;
    let updatedData = {
        "name": req.body.name,
        "genre": req.body.genre
        // "author": req.body.author,
        // "cover": req.body.cover
    };
    Book.findByIdAndUpdate(bookID, {
        $set: updatedData
    }, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }
            res.json({
                message: 'Book updated successfully',
                book: updatedBook
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while updating a book'
            });
        });
};

// function to delete an employee from the database using employee ID
const destroy = (req, res, next) => {
    let bookID = req.params.bookID;
    Book.findOneAndDelete(bookID)
        .then(deletedBook => {
            if (!deletedBook) {
                return res.status(404).json({
                    message: 'Bok not found'
                });
            }
            res.json({
                message: 'Book deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while deleting a book'
            });
        });
};

module.exports = { index, show, store, update, destroy };
