import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Product from "../../../models/Product";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { title, slug, desc, img, category, size, color, price, availqty } = req.body;
            const product = new Product({
                title,
                slug,
                desc,
                img,
                category,
                size, 
                color,
                price, 
                availqty
            });
            await product.save();
            return res.status(200).send(wrapResponse.success(200, product));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
