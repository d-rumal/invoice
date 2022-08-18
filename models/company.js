import db from '../utils/database.js';

class Company {
    static addCompany = (body) => {
        return db.query('INSERT INTO company SET ?', body);
    }
    static getCompany = (companyId) => {
        return db.query('SELECT * FROM company WHERE company_id = ?', [companyId]);
    }
}

export default Company;