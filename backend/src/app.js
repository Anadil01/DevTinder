const express = require('express');
const app = express();
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");




app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


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




