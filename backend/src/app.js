const express = require('express');
const app = express();
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/scoket");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/", userRouter);

const Server = http.createServer(app);

initializeSocket(Server);



const port = 7777;

connectDB()
.then(()=>{
    console.log("Database connected Sucessfully");
    Server.listen(port , ()=>{
        console.log(`Server is runing on port ${port}`);
    });
})

.catch((error)=> {
    console.error("Database has failed");
});




