const mongoose = require('mongoose');


const db = process.env.MONGO_URI;

const connectDb = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongoose Connected'))
    .catch(err => console.log('Error in connecting mongoose'));
    
    mongoose.Promise = global.Promise;
}

module.exports = connectDb;
