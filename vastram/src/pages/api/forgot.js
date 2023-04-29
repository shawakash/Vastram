import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Product from "../../../models/Product";
import Forgot from "../../../models/Forgot";
import User from "../../../models/User";
import { uid } from 'uid';

const handler = async (req, res) => {
    try {
        const { email } = JSON.parse(req.body);
        // Check If User Exist In Database 
        const user = await User.findOne({ email });
        console.log(user)
        if(!user) {
            return res.status(404).send(wrapResponse.error(404, 'No Such User :| '));
        }
        // Send An Email To User
        let token = `${uid(32)}`;
        const upDateForgot = await Forgot.findOneAndUpdate({email}, { token, name: user.name, email }, {upsert: true, returnOriginal: false})
        console.log(upDateForgot)
        let forgotEmail = `
        Hi ${user.name},
        
        There was a request to change your password!
        
        If you did not make this request then please ignore this email.

        Don't share the link provided to anyone !!!
        
        Otherwise, please click this link to change your password: <a href='http://www.vastram.asc/forgot?token=${token}'>Link</a>`;
        console.log(token)
        return res.status(200).send(wrapResponse.success(200, {user: {email: user.email, name: user.name, address: user.address, pincode: user.pincode, phone: user.phone}, token}));

    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}

export default connectDb(handler);
