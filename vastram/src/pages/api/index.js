const mongoose = require('mongoose');

module.exports = async () => {
    const mongooseUri = 'mongodb+srv://admin-akash:220104008@cluster0.kcycili.mongodb.net/?retryWrites=true&w=majority';
    const connect = await mongoose.connect(mongooseUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    )
        .then((e) => console.log('Database Connected.'))
        .catch(console.error)
}