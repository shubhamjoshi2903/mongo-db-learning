import express from 'express';
import controller from '../controllers/Authors';
import verifyToken from '../middleware/jwtAuth';

const router = express.Router();

router.get('/author/:authorId', verifyToken, controller.readAuthor);
router.post('/author/login', controller.loginAuthor);
router.get('/all-authors', controller.readAllAuthor);
router.put('/update/:authorId', controller.updateAuthor);
router.delete('/delete-author/:authorId', controller.deleteAuthor);
router.post('/create-author', controller.createAuthor);

export = router;
