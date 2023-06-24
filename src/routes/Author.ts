import express from 'express';
import controller from '../controllers/Authors';

const router = express.Router();

router.post('/create-author', controller.createAuthor);
router.get('/author/:authorId', controller.readAuthor);
router.get('/all-authors', controller.readAllAuthor);
router.put('/update/:authorId', controller.updateAuthor);
router.delete('/delete-author/:authorId', controller.deleteAuthor);

export = router;
