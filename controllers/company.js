import Company from '../models/company.js';
import multer from 'multer';

class CompanyController {
    static company_logo;
    static logoDownloader = () => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/assets');
            },
            filename: (req, file, cb) => {
                this.company_logo = file.originalname;
                cb(null, file.originalname);
            }
        });

        const uploadImg = multer({ storage: storage }).any('company_logo');
        return uploadImg
    }

    static getCompany = (req, res, next) => {
        Company.getCompany(req.params.id)
            .then(([rows, fieldData]) => {
                res.status(200).send(rows[0]).end()
            })
            .catch(err => {
                res.status(400).send(err).end()
            })
    }

    static addCompany = (req, res, next) => {
        req.body.company_logo = '/assets/' + this.company_logo
        console.log(req.body)
        Company.addCompany(req.body)
            .then((result) => {
                res.status(200).send({
                    message: true
                }).end()
            })
            .catch(err => {
                res.status(400).send(err).end()
            })
    }
}

export default CompanyController;