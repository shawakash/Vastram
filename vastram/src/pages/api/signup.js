import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { name, email, password, address } = JSON.parse(req.body);
            const user = new User({
                name: name,
                email: email, 
                password: password, 
                address: address,
            });
            const createdUser = await user.save();
            return res.status(200).send(wrapResponse.success(200, user));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);