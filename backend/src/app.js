const express = require('express');

const app = express();

const port = 7777;

app.use((req , res)=>{
    res.send("hello from server");
});


app.listen(port , ()=>{
    console.log(`Server is runing on port ${port}`);
})