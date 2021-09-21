const mongoose=require('mongoose');
const {db_link}=require('./secret.js')
const validator = require("email-validator");
mongoose.connect(db_link).then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    
    createdAt : {
        type:Date
    },

    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
        validate:function(){
            return this.password==this.confirmPassword
        }
    }
});

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})

const userModel=mongoose.model('userModel',userSchema);

module.exports = userModel;

// (async function createUser(){
//     let user={
//         name:'A',
//         age:10,
//         email:'abcd@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let userObj=await userModel.create(user);
//     console.log(userObj);
// })();