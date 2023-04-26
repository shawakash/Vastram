import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { name, email, password, address } = JSON.parse(req.body);
            const encryptPass = CryptoJS.AES.encrypt(password, `${process.env.SECRET_KEY}`).toString();
            const user = new User({
                name: name,
                email: email, 
                password: encryptPass, 
                address: address,
            });
            const createdUser = await user.save();
            const accessToken = jwt.sign({ email: email, password: user.password}, `${process.env.JWT_KEY}`, { expiresIn: '1h' });
            return res.status(200).send(wrapResponse.success(200, {user, accessToken}));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
