
export default function handler(req, res) {
    if (req.method == 'POST') {

        try {
            const pincodes = [545445, 700015, 781039];
            const body = JSON.parse(req.body);
            console.log(body.pincode);
            const pincodeRecieved = body.pincode;
            if (!pincodeRecieved) {
                return res.status(401).json({
                    value: 'Pincode Not Recieved',
                })
            }
            if (pincodes.includes(pincodeRecieved)) {
                return res.status(200).json({
                    value: true,
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
