import express from 'express';
import Controller from '../controllers/Category';

const router = express.Router();

router.post('/create-category', Controller.CreateCategory);

export = router;
