const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    availqty: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
});
mongoose.models = {}
export default mongoose.model("Product", ProductSchema);
// export default mongoose.model.Product || mongoose.model("Product", ProductSchema);