import express from 'express';
import controller from '../controllers/Authors';
import verifyToken from '../middleware/jwtAuth';
import imageUpload from '../middleware/upload';

const router = express.Router();

router.get('/author/:authorId', verifyToken, controller.readAuthor);
router.post('/author/login', controller.loginAuthor);
router.get('/all-authors', verifyToken, controller.readAllAuthor);
router.put('/update/:authorId', verifyToken, controller.updateAuthor);
router.delete('/delete-author/:authorId', verifyToken, controller.deleteAuthor);
router.post('/create-author', controller.createAuthor);

export = router;
