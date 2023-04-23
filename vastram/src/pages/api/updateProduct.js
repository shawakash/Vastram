import mongoose from "mongoose";
import connectDb from "../../../middleware/connectDb";
import wrapResponse from "bring/utils/wrapResponse";
import Product from "../../../models/Product";

const handler = async (req, res) => {
    try {
        const { productId, title, slug, desc, img, category, size, color, price, availqty } = req.body; 
        let product = await Product.findByIdAndUpdate(productId,{title, slug, desc, img, category, size, color, price, availqty});
        if(!product) {
            return res.status(404).send(wrapResponse.error(404, 'No such Product'));
        }        
        const updateProduct = await Product.findById(productId);
        return res.status(200).send(wrapResponse.success(200, updateProduct));
    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}

export default connectDb(handler);