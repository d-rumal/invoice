import db from '../utils/database.js';

class Invoice {
    static getInvoice = (invoiceId) => {
        return db.query('SELECT * FROM invoice LEFT JOIN orders ON invoice.invoice_id = orders.invoice_id WHERE invoice.invoice_id = ?;', [invoiceId]);
    }
    static addInvoice = (body) => {
        return db.query('INSERT INTO invoice SET ?', body)
    }
}

export default Invoice;