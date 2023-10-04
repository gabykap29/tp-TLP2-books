import express from 'express';
import { bookCtrl } from '../controllers/book.controller.js';
import { authorCtrl } from '../controllers/author.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
});





//apis

//Author
router.post('/api/author/create', authorCtrl.create);
router.get('/api/authors', authorCtrl.findAll);
router.get('/api/author/:id', authorCtrl.findOne);
router.put('/api/author/update/:id', authorCtrl.updateOne);
router.delete('/api/author/delete/:id', authorCtrl.deleteOne);

//Books
router.post('/api/book/create', bookCtrl.create);
router.get('/api/books', bookCtrl.findAll);
router.get('/api/book/:id', bookCtrl.findOne);
router.put('/api/book/update/:id', bookCtrl.updateOne);
router.delete('/api/book/delete/:id', bookCtrl.deleteOne);



export default router;