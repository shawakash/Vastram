import mongoose from "mongoose";
import connectDb from "../../../middleware/connectDb";
import wrapResponse from "bring/utils/wrapResponse";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const {  password, oldPassword, email } = JSON.parse(req.body);
            const checkuser = await User.findOne({ email });
            const bytes = CryptoJS.AES.decrypt(checkuser.password, `${process.env.SECRET_KEY}`);
            const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
            if(decryptPass != oldPassword) {
                return res.status(400).send(wrapResponse.error(400, 'Wrong Password'))
            }
            const encryptNewPassword = CryptoJS.AES.encrypt(password, `${process.env.SECRET_KEY}`).toString();
            const dbuser = await User.findOneAndUpdate({ email }, { password: encryptNewPassword });
            if (!dbuser) {
                return res.status(500).send(wrapResponse.error(500, 'User Not Found :('));
            }
            const accessToken = jwt.sign({ email: email, password: dbuser.password }, `${process.env.JWT_KEY}`, { expiresIn: '1h' });
            const user = await User.findOne({ email });

            return res.status(200).send(wrapResponse.success(200, { user: {email: user.email, name: user.name, address: user.address, pincode: user.pincode, phone: user.phone}, accessToken }));
        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    }
    else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);