import mongoose from "mongoose";
import connectDb from "../../../middleware/connectDb";
import wrapResponse from "bring/utils/wrapResponse";
import User from "../../../models/User";
import Forgot from "../../../models/Forgot";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const {  password, email, token } = JSON.parse(req.body);
            const forgot = await Forgot.findOne({token});
            if(!forgot) {
                return res.status(400).send(wrapResponse.error(400, "Token Doesn't matches :("));
            }
            const encryptNewPassword = CryptoJS.AES.encrypt(password, `${process.env.SECRET_KEY}`).toString();
            const dbuser = await User.findOneAndUpdate({ email: forgot.email }, { password: encryptNewPassword }, {returnOriginal: false});
            if (!dbuser) {
                return res.status(500).send(wrapResponse.error(500, 'User Not Found :('));
            }
            const accessToken = jwt.sign({ email: forgot.email, password: dbuser.password }, `${process.env.JWT_KEY}`, { expiresIn: '1h' });
            const user = await User.findOne({ email: forgot.email });

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