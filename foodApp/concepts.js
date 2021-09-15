const express = require('express');
const app = express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());
// app.use((req,res,next)=>{
//     //do some work
//     console.log('middleware function');
//     next();
// });

app.use(express.static('public'));
const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user',userRouter);
app.use('/auth',authRouter);

//mounting in express
userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

// app.use((req,res,next)=>{
//     //do some work
//     console.log('middleware 2nd time');
//     next();
// })

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.post(signupUser);

authRouter
.route('/forgotPassword')
.get(getForgotPassword)
.post(postForgotPassword,validateEmail);

function getForgotPassword(req,res){
    res.sendFile('./public/forgotPassword.html',{root:__dirname});
}

function postForgotPassword(req,res,next){
    let data = req.body;
    console.log('data', data);
    //check if email id is correct - validate
    next();
    //check if user exist in db
    // res.json({
    //     message: "data recieved",
    //     data: data.email
    // })
};

function validateEmail(req,res){
    console.log('validate Email function');
    console.log(req.body);
    //check if email is correct or not
    res.json({
        message: "data recieved",
        data: req.body
    })
}

function signupUser(req,res){
    // let userDetails = req.body;
    // let name = userDetails.name;
    // let email = userDetails.email;
    // let password = userDetails.password;

    let{email, name, password} = req.body;
    user.push({email, name, password});
    console.log('user',req.body);
    res.json({
        message: 'user signedUp',
        user: 'req.body'
    });
}

let user = [];
//client <- server
//crud=> create read update delete
//read
app.get('/',(req,res)=>{
    res.send('Home Page');
});

function getUser(req,res){
    res.json(user);
}

//Post
//client-> server
function createUser(req,res){
    user = req.body;
    res.send('data has been added successfully');
}

//update
function updateUser(req,res){
    let obj = req.body;
    for(let key in obj){
        user[key] = obj[key];
    }
    res.json(user);
}

//delete
function deleteUser(req,res){
    user = {};
    res.json(user);
}

//param route
function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}

//redirect
app.get('/user-all',(req,res)=>{
    res.redirect('/user');
});

//404 page
app.use((req,res)=>{
    res.sendFile('./public/404.html',{root:__dirname});
});