// const express=require('express');
// const app=express();

// app.listen('5000',function(){
//     console.log('server listening on port 5000');
// });

// app.use(express.json());


// let user={};
// // client <- server
// app.get('/',(req,res)=>{
//     res.send('Home Page');
// });

// app.get('/user',(req,res)=>{
//     res.json(user);
// });

// //post request
// // client-> server 
// app.post('/user',(req,res)=>{
//     user=req.body;
//     // console.log(req.body);
//     res.send('data has been added succesfully');
// });

// app.patch('/user',(req,res)=>{
//     let obj=req.body;
//     for(let key in obj){
//         user[key]=obj[key];
//     }
//     res.json(user);
// });

// app.delete('/user',(req,res)=>{
//     user={};
//     res.json(user);
// });

// app.get('/user/:id',(req,res)=>{
//     console.log(req.params);
//     res.json(req.params.id);
// });




const express = require('express');
const app = express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());
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

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.post(signupUser);

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
