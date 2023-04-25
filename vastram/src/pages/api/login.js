import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";
import { useRouter } from "next/router";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { email, password } = JSON.parse(req.body);
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send(wrapResponse.error(404, 'No Such User'));
            }
            const bytes = CryptoJS.AES.decrypt(user.password, 'ENCRYPT_KEY');
            const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
            if (password != decryptPass) {
                return res.status(400).send(wrapResponse.error(400, 'Wrong Password'));
            }
            const accessToken = jwt.sign({ email: email, password: user.password}, 'ENCRYPT_KEY', { expiresIn: '1h' });
            return res.status(200).send(wrapResponse.success(200, {user, accessToken}));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
