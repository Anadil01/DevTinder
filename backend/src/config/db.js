const mongoose = require('mongoose');



const connectDB = async ()=>{
   await mongoose.connect('mongodb+srv://mdanadil32_db_user:qrEIU4j9hYS6uVjy@cluster0.gxjf47g.mongodb.net/DevTinder?appName=Cluster0');
}

module.exports = connectDB;