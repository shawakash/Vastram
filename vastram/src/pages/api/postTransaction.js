import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb";
import Order from "../../../models/Order";
import Product from "../../../models/Product";

const handler = async (req, res) => {
    try {
        if (req.body.STATUS == 'TXN_SUCCESS') {
            // update order status to confirm
            const order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'PAID', paymentInfo: JSON.stringify(req.body) });
            const orderedProducts = order.products;
            for(let orderedProduct in orderedProducts) {
                const product = await Product.findOneAndUpdate({slug: orderedProduct},{
                    $inc: {availqty: -orderedProducts[orderedProduct].qty}
                });
                console.log('Updated Product in Stock', product);
            }
            //  initiate shpiment
            // redirect to order pages 
            return res.status(200).redirect(`/order?${order._id}`, 200);
        } else if (req.body.STATUS == 'PENDING') {
            const order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'PAYMENT PROBLEM', paymentInfo: JSON.stringify(req.body) });
            // redirect to order pages 
            // return res.status(200).redirect(`/order?id=${order._id}`, 200);
        }
    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}


export default connectDb(handler);