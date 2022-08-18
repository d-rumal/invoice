import Order from '../models/order.js';

class OrderController {
    static getOrder = (req, res, next) => {
        Order.getOrder(req.params.id)
            .then(([rows, fieldData]) => {
                res.status(200).send(rows[0]).end();
            })
    }
}

export default OrderController;