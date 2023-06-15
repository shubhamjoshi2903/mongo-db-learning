import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Authors';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(400).json({ error: 'user not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((err) => res.status(500).json({ error: err }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);
                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((err) => res.status(500).json({ error: err }));
            } else {
                res.status(404).json({ message: 'Author not Found' });
            }
        })
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Author deleted' }) : res.status(400).json({ error: 'Author not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};

export default { readAllAuthor, createAuthor, deleteAuthor, updateAuthor, readAuthor };
