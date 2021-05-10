const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
app.disable('view cache');
app.set('env development')

//functions...This is def not the best way to do this, but couldn't really come up with another one
//Maybe I will come up with another way to fix this, but so far this is the best option
//makes login kinda slow as well, but nothing too too bad 
async function getVariables(req,res){
    var counter = 1;
    
        var email = localStorage.getItem('email');
        //was not working at all when using var or let...so had to just define global variable, that worked for some reason...Maybe something with running it multiple times???
        user = await renderUserProfile.redirect(req,res,email,counter)
    
    //console.log(user)
    app.get('/homepage',(req,res,next)=>{
        //console.log(user.first_name)
       res.setHeader("Cache-Control","no-cache, no-store, must-revalidate");
       res.setHeader("Pragma","no-cache")
       res.setHeader("Expires","0");
        res.render('homepage',{
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            location: user.location,
            gender: user.gender,
            interests1: user.interests1,
            interests2: user.interests2,
            interests3: user.interests3,
            prefferedSex1: user.prefferedSex1,
            prefferedSex2: user.prefferedSex2,
            prefferedSex3: user.prefferedSex3
        });
    });

}

async function getEditUser(req,res){
    var counter = 2;
    var email = localStorage.getItem('email'); 
    user = await renderUserProfile.redirect(req,res,email,counter)
    

    app.get('/editUser',(req,res,next)=>{
        res.render('editUser',{
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            location: user.location,
            gender: user.gender,
            interests1: user.interests1,
            interests2: user.interests2,
            interests3: user.interests3,
            prefferedSex1: user.prefferedSex1,
            prefferedSex2: user.prefferedSex2,
            prefferedSex3: user.prefferedSex3
        });
    });

}

async function getPotentialMatches(req,res){
    var minAge = req.body.minAge;
    var maxAge = req.body.maxAge;
    user = await loadUserController(req,res,minAge,maxAge)
    app.get('/like',(req,res,next)=>{
        res.render('like',{
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            location: user.location,
            gender: user.gender,
            interests1: user.interests1,
            interests2: user.interests2,
            interests3: user.interests3,
        });
    });

}

async function getMatches(req,res,counter){
    if (counter===0){
        matches = await Promise.resolve(matchController.match(req,res))
    } else if (counter===1){
        matches = await Promise.resolve(matchController.nextMatch(req,res))
    } else if (counter===2){
        matches =  await Promise.resolve(matchController.previousMatch(req,res))
    }
    app.get('/matches',(req,res,next)=>{
        res.render('matches',{
            first_name: matches.first_name,
            last_name: matches.last_name,
            visibilityNext: nextButtonVisibility,
            visibilityPrevious: previousButtonVisibility
        });
    });
}

async function getFullProfileMatch(req,res,email){
   var counter = 3;
    user = await renderUserProfile.redirect(req,res,email,counter)
    app.get('/fullProfile',(req,res,next)=>{
        res.render('fullProfile',{
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            location: user.location,
            gender: user.gender,
            interests1: user.interests1,
            interests2: user.interests2,
            interests3: user.interests3,
            prefferedSex1: user.prefferedSex1,
            prefferedSex2: user.prefferedSex2,
            prefferedSex3: user.prefferedSex3
        });
    });
}

async function admingetEditUser(req,res,email){
    var counter = 2;
    user = await renderUserProfile.redirect(req,res,email,counter)
    

    app.get('/editUser',(req,res,next)=>{
        res.render('editUser',{
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            location: user.location,
            gender: user.gender,
            interests1: user.interests1,
            interests2: user.interests2,
            interests3: user.interests3,
            prefferedSex1: user.prefferedSex1,
            prefferedSex2: user.prefferedSex2,
            prefferedSex3: user.prefferedSex3
        });
    });

}

function adminGetAmountMatches(req,res,amountMatches){
    app.get('/amountMatches',(req,res,next)=>{
        res.render('amountMatches',{
            amountMatches:amountMatches
        });
    });
}

function adminGetAmountUsers(req,res,amountUsers){
    app.get('/amountUsers',(req,res,next)=>{
        res.render('amountUsers',{
            amountUsers:amountUsers
        });
    });
}



module.exports = {
    getVariables,
    getEditUser,
    getPotentialMatches,
    getMatches,
    getFullProfileMatch,
    admingetEditUser,
    adminGetAmountMatches,
    adminGetAmountUsers
}



//controller require 
const signupController = require('./public/js/signupController');
const forgotpasswordController = require('./public/js/forgotPasswordController');
const newpasswordController = require('./public/js/newpasswordcontroller');
const loginController = require('./public/js/loginController');
const stayLoggedinController = require('./public/js/stayLoggedinController');
const logOutController = require('./public/js/logOutController');
const deleteUserController = require('./public/js/deleteUserController');
const editUserController = require('./public/js/editUserController');
const loadUserController = require('./public/js/loadUserController')
const likeAndDislikeController = require('./public/js/likeAndDislikeController');
const matchController = require('./public/js/matchController');
const renderUserProfile = require('./public/js/renderUserProfileController')
const stayLoggedin = require('./public/js/stayLoggedinController');
const adminController = require('./public/js/adminController');
const axios = require('axios').default;
const { response } = require('express');
const { unwatchFile } = require('fs');




app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res,next)=>{
    res.render('welcome',{
        
    });
});

app.get('/admin',(req,res,next)=>{
    res.render('admin',{
        
    });
});

app.get('/adminDeleteUser',(req,res,next)=>{
    res.render('adminDeleteUser',{
        
    });
});

app.get('/adminEditUser',(req,res,next)=>{
    res.render('adminEditUser',{
        
    });
});

app.post('/adminEditUser',adminController.adminEditUser)
app.post('/adminDeleteUser',adminController.adminDeleteUser)
app.post('/adminAmountofMatches',adminController.adminAmountofMatches)
app.post('/adminAmountofUsers',adminController.adminAmountofUsers)


app.get('/savedChanges',(req,res,next)=>{
    res.render('savedChanges',{

    });
});

app.post('/homepage',getVariables);
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

app.get('/login',(req,res,next)=>{
    res.render('login');
});

app.get('/findYourLovePage',(req,res,next)=>{
    res.render('findYourLove',{
        
    });
});
app.post('/login',loginController);

app.post('/deleteUser',deleteUserController);

app.post('/editUser',getEditUser);
app.post('/updateUser',editUserController);
app.post('/logOut',logOutController);


app.post('/findYourLove',getPotentialMatches);
app.post('/like',likeAndDislikeController.like);
app.post('/dislike',likeAndDislikeController.dislike);


app.post('/matches',matchController.smtMatch);
app.post('/next',matchController.smtNextMatch);
app.post('/previous',matchController.smtPreviousMatch);
app.post('/seeFullmatch',matchController.seeFullMatch)
app.post('/deleteMatch',matchController.deleteMatch)


app.engine('hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));
app.set('view engine','.hbs');


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');