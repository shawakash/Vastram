import pincodes from '../../../pincodes.json'
export default function handler(req, res) {
    if (req.method == 'POST') {

        try {
            const body = JSON.parse(req.body);
            const pincodeRecieved = body.pincode;
            if (!pincodeRecieved) {
                return res.status(401).json({
                    value: 'Pincode Not Recieved',
                })
            }
            if (Object.keys(pincodes).includes(pincodeRecieved.toString())) {
                return res.status(200).json({
                    value: true,
                    code: pincodes[pincodeRecieved]
                });
            } else {
                return res.status(404).json({
                    value: false,
                });
            }
        } catch (err) {
            return res.status(500).json({
                err: err.message
            });
        }
    }
}
