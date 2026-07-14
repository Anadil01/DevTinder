const mongoose = require("mongoose");
const validator = require('validator'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },

    lastName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error ("Email is not valid!!" + value);
        }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        min: 18
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },

    photoUrl: {
        type: String,
        default: "https://www.magnific.com/free-photos-vectors/dummy-person",
        validate(str){
            if(!validator.isURL(str)){
                throw new Error ("Url is not valid!!");
            }
            }
    },

    about: {
        type: String,
        default: "Write something about yourself!!"
    },

    skills: {
        type: [String]
    }
},
{
    timestamps: true
});


UserSchema.methods.getJWT = async function(){
  const user = this;

  const token = jwt.sign({ _id: user._id }, "ugfewfuewgfgewkudgugguwe",
      { expiresIn: "1d" });

    return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const hashPassword = user.password;
    const isPasswordValidate = await bcrypt.compare(passwordInputByUser , hashPassword);

    return isPasswordValidate;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;