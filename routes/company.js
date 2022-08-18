import express from 'express';
import CompanyController from '../controllers/company.js';

const router = express.Router()

router.get('/:id', CompanyController.getCompany)
router.post('/add', CompanyController.logoDownloader(), CompanyController.addCompany)


export default router;