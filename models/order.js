import db from '../utils/database.js';

class Order {
    static addOrder = (product_data) => {
        return db.query('INSERT INTO orders (product_name, product_desc, product_rate, product_tax, product_qty, invoice_id) VALUES ?', [product_data]);
    }
    static getOrder = (orderId) => {
        return db.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
    }
    static getOrdersByInvoiceId = (invoiceId) => {
        return db.query('SELECT * FROM orders WHERE invoice_id = ?', [invoiceId]);
    }
}

export default Order;