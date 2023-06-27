"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Books_1 = __importDefault(require("../models/Books"));
const createBook = (req, res, next) => {
    const { title, author } = req.body;
    const book = new Books_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ error: err }));
};
const readBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Books_1.default.findById(bookId)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(400).json({ error: 'Book not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAllBook = (req, res, next) => {
    return Books_1.default.find()
        .populate('author', '_id name  email')
        .select('-__v')
        .then((books) => {
        console.log('books', books);
        return res.status(200).json({ books });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Books_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((err) => res.status(500).json({ error: err }));
        }
        else {
            res.status(404).json({ message: 'Book not Found' });
        }
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Books_1.default.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'Book deleted' }) : res.status(400).json({ error: 'Book not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.default = { readAllBook, createBook, deleteBook, updateBook, readBook };
