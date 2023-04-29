const mongoose = require('mongoose');

const ForgotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
});
mongoose.models = {};
export default mongoose.model("Forgot", ForgotSchema);
// export default mongoose.model.User || mongoose.model("User", UserSchema);