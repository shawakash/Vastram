import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";
import { useRouter } from "next/router";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { email, password } = JSON.parse(req.body);
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send(wrapResponse.error(404, 'No Such User'));
            }
            const bytes = CryptoJS.AES.decrypt(user.password, `${process.env.SECRET_KEY}`);
            const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
            if (password != decryptPass) {
                return res.status(400).send(wrapResponse.error(400, 'Wrong Password'));
            }
            const accessToken = jwt.sign({ email: email, password: user.password}, `${process.env.JWT_KEY}`, { expiresIn: '1d' });
            return res.status(200).send(wrapResponse.success(200, {user: {email: user.email, name: user.name, address: user.address, pincode: user.pincode, phone: user.phone }, accessToken}));

        } catch (e) {
            if(e.message.includes("jwt expired")) {
                return res.redirect('/login');
            }
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
