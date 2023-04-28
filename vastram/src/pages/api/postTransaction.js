import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import PaytmChecksum from "paytmchecksum"

const handler = async (req, res) => {
    try {
        /* import checksum generation utility */

        /* string we need to verify against checksum */
        var paytmCheckSum = "";
        var paytmParams = {};
        const receieved_data = req.body;
        for (var key in receieved_data) {
            if (key == 'CHECKSUMHASH') {
                paytmCheckSum = receieved_data[key];
            } else {
                paytmParams[key] = receieved_data[key];
            }
        }
        var isVerifySignature = PaytmChecksum.verifySignature(body, process.env.NEXT_PUBLIC_PAYTM_MID, paytmCheckSum);
        if (!isVerifySignature) {
            return res.status(500).send(wrapResponse.error(500, 'Some Error Occurred'))
        }
        if (req.body.STATUS == 'TXN_SUCCESS') {


            // update order status to confirm
            const order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'PAID', paymentInfo: JSON.stringify(req.body) });
            const orderedProducts = order.products;
            for (let orderedProduct in orderedProducts) {
                const product = await Product.findOneAndUpdate({ slug: orderedProduct }, {
                    $inc: { availqty: -orderedProducts[orderedProduct].qty }
                });
                console.log('Updated Product in Stock', product);
            }
            //  initiate shpiment
            // redirect to order pages 
            return res.status(200).redirect(`/order?${order._id}`, 200);
        } else if (req.body.STATUS == 'PENDING') {
            const order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'PAYMENT PROBLEM', paymentInfo: JSON.stringify(req.body) });
            // redirect to order pages 
            return res.status(200).redirect(`/order?id=${order._id}`, 200);
        }
    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}


export default connectDb(handler);