const mongoose = require("mongoose");


uri= "mongodb+srv://yashsahu7104_db_user:ViY8vxoGbXuLpHMj@pminternship.2ng29da.mongodb.net/?appName=pminternship";


const connectDB =  () => {
    return mongoose.connect(uri ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;