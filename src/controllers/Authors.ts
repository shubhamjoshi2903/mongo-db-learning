import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Authors';
import dotenv from 'dotenv';
import Books from '../models/Books';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import fs from 'fs';
import { promisify } from 'util';

import { config } from '../config/config';
import uploadImageAws from '../utils/aws';
import viewImageAws from '../utils/aws/viewFile';
dotenv.config();
const unlinkAsync = promisify(fs.unlink);
const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    // const file = req?.files?.buffer() as Express.Multer.file;
    // console.log('req.file', req?.file?.buffer);
    const bufferData = req?.file?.buffer;
    const profile = req.files as Express.Multer.File[];
    console.log('profile', profile);

    // const fileName = profile[0];
    // const url = await uploadImageAws(profile[0]?.buffer);
    // console.log('url', url);
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
        return res.status(400).send('All input is required');
    }
    const oldUser = await Author.findOne({ email });
    // const viewImage = await viewImageAws(url);
    // console.log('viewImage', viewImage);
    if (oldUser) {
        return res.status(409).json({ status: 409, message: 'User Already Exist.' });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: encryptedPassword
        // profileImage: url
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((err) => res.status(500).json({ error: err }));
};

const loginAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send('All input is required');
        }
        // Validate if user exist in our database
        const user = await Author.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, process.env.SECRETKEY as Secret, {
                expiresIn: 86400
            });
            user.token = token;
            const userDetail = {
                id: user.id,
                name: user.name,
                email: user.email,
                token: user.token
            };
            // user
            return res.status(200).json({ userDetail: userDetail });
        }
        return res.status(400).json({ message: 'Invalid Credentials' });
    } catch (error) {
        console.log('error', error);
    }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(400).json({ error: 'user not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    return await Author.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: 'author',
                pipeline: [{ $lookup: { from: 'categories', localField: '_id', foreignField: 'book', as: 'category' } }],
                as: 'books'
            }
        }
    ])
        .then((authors: any) => {
            const filteredAuhtors = authors.map((author: any) => {
                return { _id: author._id, name: author.name, email: author.email, books: author.books, profileImage: author.profileImage };
            });

            return res.status(200).json(filteredAuhtors);
        })
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
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then(async (author) => {
            const deletedBook = await Books.deleteMany({ author: authorId });
            return author ? res.status(201).json({ message: 'Author Deleted', deletedBook: deletedBook }) : res.status(400).json({ error: 'Author not found' });
        })
        .catch((err) => res.status(500).json({ error: err }));
};

export default { readAllAuthor, createAuthor, deleteAuthor, updateAuthor, readAuthor, loginAuthor };
