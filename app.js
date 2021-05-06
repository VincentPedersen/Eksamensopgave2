const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));




//controller require 
const signupController = require('./public/js/signupController');
const forgotpasswordController = require('./public/js/forgotPasswordController');
const newpasswordController = require('./public/js/newpasswordcontroller');
const loginController = require('./public/js/loginController');
const stayLoggedinController = require('./public/js/stayLoggedinController');
const logOutController = require('./public/js/logOutController');
const deleteUserController = require('./public/js/deleteUserController');
const updateUserController = require('./public/js/updateUserController');
const loadUserController = require('./public/js/loadUserController')
const likeController = require('./public/js/likeController');
const dislikeController = require('./public/js/dislikeController');
const matchController = require('./public/js/matchController');
const nextMatchController = require('./public/js/nextMatchController');
const previousMatchController = require('./public/js/previousMatchController');
const deleteMatchController = require('./public/js/deleteMatchController');
const stayLoggedin = require('./public/js/stayLoggedinController');
const axios = require('axios').default;
const { response } = require('express');



//const namespace =require('./namespace.js')

app.use(express.static(path.join(__dirname, 'public')));
/*
router.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname+'/Client/index.html'));
  //__dirname : It will resolve to your project folder.
});
*/
app.get('/',(req,res,next)=>{
    res.render('welcome',{
        
    });
});

app.post('/stayLogin',stayLoggedinController);


app.get('/signup',(req,res,next)=>{
    res.render('signup');
});
app.post('/signup',signupController);

app.get('/forgotpassword',(req,res,next)=>{
    res.render('forgotpassword')
})
app.post('/forgotpass',forgotpasswordController);

app.get('/newpassword',(req,res,next)=>{
    res.render('newpassword')
})
app.post('/newpass',newpasswordController);
/*
app.post('/signup',function(req,res) {
        axios.post('http://localhost:7071/api/SignUp',
            {email:req.body.email,first_name:req.body.first_name,last_name:req.body.last_name,age:req.body.age,location:req.body.location,gender:req.body.gender},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
});
*/
app.get('/login',(req,res,next)=>{
    res.render('login');
});
app.post('/login',loginController);


app.get('/homepage',(req,res,next)=>{
    res.render('homepage',{
        name: displayName,
        password: displayPassword,
        gender: displayGender,
        nationality: displayNationality,
        location: displayLocation,
        prefferedSex: displayPrefferedSex,
        interests: displayInterests
    });
});
app.post('/deleteUser',deleteUserController);

app.get('/editUser',(req,res,next)=>{
    res.render('editUser',{
        name: displayName,
        password: displayPassword,
        gender: displayGender,
        nationality: displayNationality,
        location: displayLocation,
        prefferedSex: displayPrefferedSex,
        interests: displayInterests
    });
});
app.post('/updateUser',updateUserController);
app.post('/logOut',logOutController);

app.get('/like',(req,res,next)=>{
    res.render('like',{
        name: userProfileUsername,
        password: userProfilePassword,
        gender: userProfileGender,
        nationality: userProfileNationality,
        location: userProfileLocation,
        prefferedSex: userProfilePrefferedSex,
        interests: userProfileInterests
    });
});

app.post('/findYourLove',loadUserController);
app.post('/like',likeController);
app.post('/dislike',dislikeController);

app.get('/matches',(req,res,next)=>{
    res.render('matches',{
        name: matchProfileUsername,
        password: matchProfilePassword,
        gender: matchProfileGender,
        nationality: matchProfileNationality,
        location: matchProfileLocation,
        prefferedSex: matchProfilePrefferedSex,
        interests: matchProfileInterests, 
        visibilityNext: nextButtonVisibility,
        visibilityPrevious: previousButtonVisibility
    });
});

app.post('/matches',matchController);
app.post('/next',nextMatchController);
app.post('/previous',previousMatchController);
app.post('/deleteMatch',deleteMatchController)



app.engine('hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));
app.set('view engine','.hbs');


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');