import util from 'util';
import multer from 'multer';
import * as path from 'path';
import { NextFunction, Request, Response } from 'express';

// const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// export const upload = multer({ dest: 'src/assets/uploads' });
export const upload = multer({ storage: storage });

// let storage = multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'upload'),
//     filename: (req, file, cb) => {
//         console.log(file.originalname);
//         cb(null, file.originalname);
//     }
// });
// let uploadFile = multer({
//     storage: storage,
//     limits: { fileSize: maxSize }
// }).single('file');

// let uploadFileMiddleware = util.promisify(uploadFile);
