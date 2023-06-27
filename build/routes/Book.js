"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const validationSchema_1 = require("../middleware/validationSchema");
const jwtAuth_1 = __importDefault(require("../middleware/jwtAuth"));
const router = express_1.default.Router();
router.get('/book/:bookId', jwtAuth_1.default, Book_1.default.readBook);
router.get('/all-books', jwtAuth_1.default, Book_1.default.readAllBook);
router.put('/update/:bookId', jwtAuth_1.default, validationSchema_1.validateSchema, Book_1.default.updateBook);
router.delete('/delete-book/:bookId', jwtAuth_1.default, Book_1.default.deleteBook);
router.post('/create-book', jwtAuth_1.default, Book_1.default.createBook);
module.exports = router;
