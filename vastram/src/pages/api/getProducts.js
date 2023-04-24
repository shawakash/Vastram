import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Product from "../../../models/Product";

const handler = async (req, res) => {
    try {
        const products = await Product.find({ category: 'shirts' });
        let tshirts = {};

        for (let item of products) {
            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.availqty) {
                    tshirts[item.title].color = [...tshirts[item.title].color, item.color];
                    // (tshirts[item.title].color).push(item.color);
                }
                if (!tshirts[item.title].size.includes(item.size) && item.availqty) { 
                    tshirts[item.title].size = [...tshirts[item.title].size, item.size];
                    // (tshirts[item.title].size).push(item.size);
                }
                tshirts[item.title].availqty += item.availqty;

            } else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item));

                if (item.availqty > 0) {
                    tshirts[item.title].color = [item.color];
                    tshirts[item.title].size = [item.size];
                    tshirts[item.title].availqty += item.availqty;
                }

            }
        }


        return res.status(200).send(wrapResponse.success(200, tshirts));

    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}

export default connectDb(handler);
