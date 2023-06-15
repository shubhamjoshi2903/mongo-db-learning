import express from 'express';
import controller from '../controllers/Book';
import { Schema, validateSchema } from '../middleware/validationSchema';

const router = express.Router();

router.get('/book/:bookId', controller.readBook);
router.get('/all-books', controller.readAllBook);
router.put('/update/:bookId', validateSchema, controller.updateBook);
router.delete('/delete-book/:bookId', controller.deleteBook);
router.post('/create-book', validateSchema(Schema.author.create), controller.createBook);

export = router;
