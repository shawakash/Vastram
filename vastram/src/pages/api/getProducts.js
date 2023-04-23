import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Product from "../../../models/Product";

const handler = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(wrapResponse.success(200, products));

    } catch (error) {
        return res.status(500).send(wrapResponse.error(500, 'Internal Server Error'));
    }
}

export default connectDb(handler);
