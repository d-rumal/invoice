import express from 'express';
import OrderController from '../controllers/order.js';
import Order from '../models/order.js';

const router = express.Router();

router.get('/:id', OrderController.getOrder)
router.post('/add', (req, res, next) => {
    Order.addOrder(req.body)
        .then((result) => {
            res.status(200).send({
                message: true
            }).end()
        })
        .catch(err => {
            res.status(400).send(err).end()
        })
})

export default router;