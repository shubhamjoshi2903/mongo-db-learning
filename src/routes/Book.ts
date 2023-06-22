import express from 'express';
import controller from '../controllers/Book';
import { Schema, validateSchema } from '../middleware/validationSchema';
import verifyToken from '../middleware/jwtAuth';

const router = express.Router();

router.get('/book/:bookId', verifyToken, controller.readBook);
router.get('/all-books', verifyToken, controller.readAllBook);
router.put('/update/:bookId', verifyToken, validateSchema, controller.updateBook);
router.delete('/delete-book/:bookId', verifyToken, controller.deleteBook);
router.post('/create-book', verifyToken, controller.createBook);

export = router;
