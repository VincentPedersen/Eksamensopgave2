const axios = require('axios').default;
function signUp(user){
axios.post('http://localhost:7071/api/SignUp',
            {email:user.email,first_name:user.first_name,last_name:user.last_name,age:user.age,location:user.location,gender:user.gender,password:user.password},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
        }

function forgotPassword(email){
    axios.post('http://localhost:7071/api/ForgotPassword',
            {email:email},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

function newPassword(email,hash){
    axios.post('http://localhost:7071/api/NewPassword',
            {email:email,hash:hash},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

function login(email){
    return axios.get('http://localhost:7071/api/Login',{
                params:{
                email:email
            }
        })
        .then(function(response){
            console.log("Success!")
            return response.data
            
        })
        .catch(function(error){
            console.log(error)
        })
}

function renderUserProfile(email,callback){
    return axios.get('http://localhost:7071/api/RenderUserProfile',{
                params:{
                email:email
            }
        })
        .then(function(response){
            console.log("Success!")
            return response.data
            
        })
        .catch(function(error){
            console.log(error)
        })
}


module.exports = {
    signUp,
    forgotPassword,
    newPassword,
    login,
    renderUserProfile
}