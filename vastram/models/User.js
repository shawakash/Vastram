const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String
    }
}, {
    timestamps: true,
});

export default mongoose.model("User", UserSchema);