const express = require('express');
const app = express();
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser");
require("dotenv").config();



app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);





const port = 7777;

connectDB()
.then(()=>{
    console.log("Database connected Sucessfully");
    app.listen(port , ()=>{
        console.log(`Server is runing on port ${port}`);
    });
})

.catch((error)=> {
    console.error("Database has failed");
});




