const validator = require('validator');



 const validateSignupData = (req)=>{


    const {firstName , lastName , emailId , password} = req.body;

    if(!firstName || !lastName){
        throw new Error ("Please Enter full name!");
    }else if(!validator.isEmail(emailId)){
        throw new Error ("Please Enter valid email!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error ("Please Enter Strong password!");
    }

};




const validateEditProfileData =(req) =>{
    const allowedFields = ["firstName" , "lastName" , "age" , "emailId" , "about" , "gender" , "photoUrl" , "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));

    return isEditAllowed;
}

module.exports={validateSignupData , validateEditProfileData};