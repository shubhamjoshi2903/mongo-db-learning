import Category from '../models/category';

import { NextFunction, Request, response, Response } from 'express';
import mongoose from 'mongoose';

const CreateCategory = (req: Request, res: Response) => {
    const { name, book } = req.body;
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name,
        book
    });
    return category
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ error: err }));
};

export default { CreateCategory };
