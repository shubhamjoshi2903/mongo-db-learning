"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../controllers/Category"));
const router = express_1.default.Router();
router.post('/create-category', Category_1.default.CreateCategory);
module.exports = router;
