import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Books';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ error: err }));
};
const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(400).json({ error: 'Book not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAllBook = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((err) => res.status(500).json({ error: err }));
};
const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);
                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((err) => res.status(500).json({ error: err }));
            } else {
                res.status(404).json({ message: 'Book not Found' });
            }
        })
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'Book deleted' }) : res.status(400).json({ error: 'Book not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};

export default { readAllBook, createBook, deleteBook, updateBook, readBook };
