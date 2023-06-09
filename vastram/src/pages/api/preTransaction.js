import wrapResponse from 'bring/utils/wrapResponse';
import connectDb from "../../../middleware/connectDb"
import { resolve } from 'path';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import pincodes from '../../../pincodes.json'
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
    // initiate order status to pending and order to order page
    if (req.method == 'POST') {

        const { cart, subTotal, oid, email, name, address, zipCode, phone } = JSON.parse(req.body);
        // Check the details of address ....
        if ((phone).toString().length != 10) {
            return res.status(500).send(wrapResponse.error(500, 'Please enter a valid 10 digits phone number :|'));
        }
        if ((zipCode).toString().length != 6) {
            return res.status(500).send(wrapResponse.error(500, 'Please enter a valid 6 digits pincode :|'));
        }

        if (!Object.keys(pincodes).includes(zipCode.toString())) {
            return res.status(404).send(wrapResponse.error(404, 'That Pincode is currently not serviceable :('));
        }


        // Check if cart is tampered
        let originalTotal = 0;
        for (let item in cart) {
            const product = await Product.findOne({ slug: item });
            originalTotal += (product.price) * (cart[item].qty)
            // Check if Items required in stock
            if (cart[item].qty > product.availqty) {
                return res.status(500).send(wrapResponse.error(500, 'Some items in cart is OUT OF STOCK, Please try later! :)'));
            }
            if (cart[item].price != product.price) {
                return res.status(500).send(wrapResponse.error(500, 'Cart has been tampered'));
            }
        }
        if (originalTotal != subTotal) {
            return res.status(500).send(wrapResponse.error(500, 'Cart has been tampered'));
        }
        const order = new Order({
            email,
            orderId: oid,
            address,
            amount: subTotal,
            pincode: zipCode,
            products: cart,
            name
        });
        const respo = await order.save();
        // iff then generate a transatcion id

        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "Vastram",
            "orderId": oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_BASEURL}/api/postTransaction`,
            "txnAmount": {
                "value": subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_KEY);

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);


        const createAysnc = () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    // hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response : ', response);
                        resolve(JSON.parse(response).body);
                    });
                });

                post_req.write(post_data);
                post_req.end();

            })
        }

        const myResponse = await createAysnc();

        return res.status(200).send(wrapResponse.success(200, myResponse));


    }
}

export default connectDb(handler);