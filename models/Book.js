const mongoose = require("mongoose");

const Schema = mongoose.Schema; // Corrected casing

const bookSchema = new Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    author: {
        type: String
    },
    cover: {
        type: String
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
