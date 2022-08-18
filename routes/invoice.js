import express from 'express';
import InvoiceController from '../controllers/invoice.js';

const router = express.Router()

router.post('/add', InvoiceController.addInvoice)
router.get('/makePDF/:id', InvoiceController.generatePDF)
router.get('/pdf/:id', InvoiceController.getPDFs)

router.use('/', (req, res) => {
    res.status(404).send({ message: 'page not found' })
})

export default router;