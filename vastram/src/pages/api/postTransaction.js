import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb";
import Order from "../../../models/Order";

const handler = async (req, res) => {
    try {
        // update order status to confirm
        const order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'PAID' });
        //  initiate shpiment
        // redirect to order pages 
        return res.status(200).redirect('/order', 200);
    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}


export default connectDb(handler);