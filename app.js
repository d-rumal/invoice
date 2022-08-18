import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import companyRoute from './routes/company.js';
import orderRoute from './routes/order.js';
import invoiceRoute from './routes/invoice.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.use(express.static(process.cwd() + '/public'));

app.use('/company', companyRoute)
app.use('/order', orderRoute)
app.use('/invoice', invoiceRoute)

app.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Welcome to invoice management!'
    })
})

app.use('/', (req, res, next) => {
    res.status(404).send({
        message: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Listening at http://localhost:3000')
})