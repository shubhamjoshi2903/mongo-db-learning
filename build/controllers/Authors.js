"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Authors_1 = __importDefault(require("../models/Authors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Books_1 = __importDefault(require("../models/Books"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
dotenv_1.default.config();
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const file = req?.files?.buffer() as Express.Multer.file;
    console.log('req.files', req);
    const profile = req.files;
    console.log('profile', profile);
    const fileName = profile[0];
    console.log('fileName', fileName);
    // await uploadImageAws(file, fileName);
    0;
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
        return res.status(400).send('All input is required');
    }
    const oldUser = yield Authors_1.default.findOne({ email });
    if (oldUser) {
        yield unlinkAsync(fileName.path);
        return res.status(409).json({ status: 409, message: 'User Already Exist.' });
    }
    const encryptedPassword = bcryptjs_1.default.hashSync(password, 10);
    const author = new Authors_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        email,
        password: encryptedPassword,
        profileImage: `http://localhost:8080/${fileName.filename}`
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((err) => res.status(500).json({ error: err }));
});
const loginAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send('All input is required');
        }
        // Validate if user exist in our database
        const user = yield Authors_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.SECRETKEY, {
                expiresIn: 86400 // expires in 24 hours
            });
            user.token = token;
            const userDetail = {
                name: user.name,
                email: user.email,
                token: user.token
            };
            // user
            return res.status(200).json({ userDetail: userDetail });
        }
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    catch (error) {
        console.log('error', error);
    }
});
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Authors_1.default.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(400).json({ error: 'user not found' })))
        .catch((err) => res.status(500).json({ error: err }));
};
const readAllAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Authors_1.default.aggregate([
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
        .then((authors) => {
        const filteredAuhtors = authors.map((author) => {
            return { id: author._id, name: author.name, email: author.email, books: author.books, profileImage: author.profileImage };
        });
        return res.status(200).json(filteredAuhtors);
    })
        .catch((err) => res.status(500).json({ error: err }));
});
const updateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Authors_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json({ author }))
                .catch((err) => res.status(500).json({ error: err }));
        }
        else {
            res.status(404).json({ message: 'Author not Found' });
        }
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return Authors_1.default.findByIdAndDelete(authorId)
        .then((author) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedBook = yield Books_1.default.deleteMany({ author: authorId });
        return author ? res.status(201).json({ message: 'Author Deleted', deletedBook: deletedBook }) : res.status(400).json({ error: 'Author not found' });
    }))
        .catch((err) => res.status(500).json({ error: err }));
});
exports.default = { readAllAuthor, createAuthor, deleteAuthor, updateAuthor, readAuthor, loginAuthor };
