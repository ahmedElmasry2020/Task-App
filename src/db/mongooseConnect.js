const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost:27017/Task-App',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true ,
            useFindAndModify:false
        }
    );
}

module.exports = dbConnect;