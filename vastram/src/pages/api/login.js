import wrapResponse from "bring/utils/wrapResponse";
import connectDb from "../../../middleware/connectDb"
import User from "../../../models/User";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const { email, password } = JSON.parse(req.body);
            const user = await User.find( {email: email} );
            if(!user) {
                return res.status(404).send(wrapResponse.error(404, 'No Such User'));
            }
            if(password != user.password) {
                return res.status(400).send(wrapResponse.error(400, 'Wrong Password'));
            } 
            return res.status(200).send(wrapResponse.success(200, user));

        } catch (e) {
            return res.status(500).send(wrapResponse.error(500, e.message));
        }
    } else {
        return res.status(400).send(wrapResponse.error(400, "It's a Post api :)"));
    }
}

export default connectDb(handler);
