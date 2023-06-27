"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Authors_1 = __importDefault(require("../controllers/Authors"));
const jwtAuth_1 = __importDefault(require("../middleware/jwtAuth"));
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
router.get('/author/:authorId', jwtAuth_1.default, Authors_1.default.readAuthor);
router.post('/login', Authors_1.default.loginAuthor);
router.get('/all-authors', jwtAuth_1.default, Authors_1.default.readAllAuthor);
router.put('/update/:authorId', jwtAuth_1.default, Authors_1.default.updateAuthor);
router.delete('/delete-author/:authorId', jwtAuth_1.default, Authors_1.default.deleteAuthor);
router.post('/create-author', upload_1.upload.array('profileImage'), Authors_1.default.createAuthor);
module.exports = router;
