import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import Product from "../../../models/Product";
import Forgot from "../../../models/Forgot";

const handler = async (req, res) => {
    try {
        const { email, user } = JSON.parse(req.body);
        // Check If User Exist In Database 
        // Send An Eamil To User
        let token = ``;
        const forgot = new Forgot({
            name: user.name,
            email,
            token
        });
        let forgotEmail = `
        Hi ${user.name},
        
        There was a request to change your password!
        
        If you did not make this request then please ignore this email.
        
        Otherwise, please click this link to change your password: <a href='http://www.vastram.asc/forgot?token=${token}'>Link</a>`;

        return res.status(200).send(wrapResponse.success(200, tshirts));

    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}

export default connectDb(handler);
