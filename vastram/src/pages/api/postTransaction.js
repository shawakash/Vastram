import wrapResponse from "bring/utils/wrapResponse";

export default function handler(req, res) {
    // update order status to confirm
    //  initiate shpiment
    // redirect to order pages 
    try {
        return res.status(200).send(wrapResponse.success(200, req.body));
    } catch (e) {
        return res.status(500).send(wrapResponse.error(500, e.message));
    }
}
