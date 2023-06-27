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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization);
    if (!token) {
        return res.status(403).json({ message: 'A token is required for Authentication' });
    }
    try {
        if (typeof token !== 'undefined') {
            const bearer = token.split(' ');
            const bearerToken = bearer[1];
            const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRETKEY);
            if (decoded) {
                next();
            }
        }
        else {
            //Fobidden
            res.sendStatus(403);
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // return next();
});
exports.default = verifyToken;
