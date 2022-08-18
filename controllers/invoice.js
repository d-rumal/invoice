import Order from "../models/order.js";
import Invoice from "../models/invoice.js";
import Company from "../models/company.js";
import makePDF from "../utils/makePDF.js";
import fs from 'fs';

class InvoiceController {

    static addInvoice = (req, res, _next) => {

        let total = 0, subtotal = 0;
        let orders = [];

        req.body.orders.map((value, _index, _array) => {
            subtotal = subtotal + (value.product_rate * value.product_qty);
            total = total + (value.product_rate * value.product_qty * (1 + value.product_tax / 100))
            orders.push(Object.values(value))
        })

        req.body.sub_total = subtotal.toFixed(2);
        req.body.total = total.toFixed(2);
        delete req.body.orders

        let results = [];
        let invoice_id;


        Invoice.addInvoice(req.body)
            .then((result) => {
                invoice_id = result[0].insertId
                orders.map((value, _index, _array) => {
                    value.push(invoice_id)
                })
                results.push(result)
                return Order.addOrder(orders)
            })
            .then((result) => {
                results.push(result)
                return makePDF(invoice_id);
            })
            // .then(result => {
            //     results.push(result)
            //     res.status(200).send(results).end();
            // })
            .catch(err => {
                res.status(400).send(err).end()
            })
        res.send({ message: true })

    }

    static generatePDF = (req, res, _next) => {
        let data = undefined;
        Invoice.getInvoice(req.params.id)
            .then(([rows, __fieldData]) => {
                let orders = rows.map((value, _index, _array) => {
                    return {
                        order_id: value.order_id,
                        product_name: value.product_name,
                        product_desc: value.product_desc,
                        product_rate: value.product_rate,
                        product_tax: value.product_tax,
                        product_qty: value.product_qty,
                        product_total: (parseFloat(value.product_rate) * parseFloat(value.product_qty)).toFixed(2)
                    }
                })
                data = {
                    invoice_id: rows[0].invoice_id,
                    recipent_name: rows[0].recipent_name,
                    recipent_addr: rows[0].recipent_addr,
                    recipent_email: rows[0].recipent_email,
                    recipent_phone: rows[0].recipent_phone,
                    date: new Date(rows[0].date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }),
                    company_id: rows[0].company_id,
                    sub_total: rows[0].sub_total.toFixed(2),
                    total: rows[0].total.toFixed(2),
                    tax: (parseFloat(rows[0].total) - parseFloat(rows[0].sub_total)).toFixed(2),
                    orders: orders
                };
                return Company.getCompany(data.company_id)
            })
            .then(([rows, _fetchData]) => {
                data.company_details = rows[0]
                res.render('pdf', {
                    href: '/css/main.css',
                    data: data
                })
            })
            .catch(err => {
                res.send(err).end()
            })


    }

    static getPDFs = (req, res, next) => {

        // STREAM
        try {
            const file = fs.createReadStream(process.cwd() + '/public/pdfs/' + req.params.id + '.pdf')
            const stat = fs.statSync(process.cwd() + '/public/pdfs/' + req.params.id + '.pdf')
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            file.pipe(res)
        } catch (err) {
            res.send(err)
        }


        // SENDFILE
        // res.contentType('application/pdf');
        // res.sendFile(process.cwd() + '/public/pdfs/' + req.params.id + '.pdf')

        // DOWNLOAD
        // res.contentType('application');
        // res.download(process.cwd() + '/public/pdfs/' + req.params.id + '.pdf')
    }
}

export default InvoiceController;