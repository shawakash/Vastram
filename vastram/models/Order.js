const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String, 
        required: true
    },
    paymentInfo: {
        type: String,
        default: ''
    },
    orderId: {
        type: String, 
        required: true
    },
    products: {
            type: Object,
            required: true
        },
    address: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, {
    timestamps: true,
});

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);