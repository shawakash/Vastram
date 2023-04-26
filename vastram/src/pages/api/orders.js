import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Order from "../../../models/Order";

var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { accessToken } = JSON.parse(req.body);
            const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
            const { email } = decoded;
            const orders = await Order.find({email: decoded.email});
            return res.status(200).send(wrapResponse.success(200, orders));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
