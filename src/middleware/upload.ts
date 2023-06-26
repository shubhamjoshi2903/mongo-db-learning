import multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });
