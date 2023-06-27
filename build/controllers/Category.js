"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../models/category"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateCategory = (req, res) => {
    const { name, book } = req.body;
    const category = new category_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        book
    });
    return category
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.default = { CreateCategory };
