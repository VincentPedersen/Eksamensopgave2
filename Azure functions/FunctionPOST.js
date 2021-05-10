const axios = require('axios').default;
function signUp(user){
axios.post('http://localhost:7071/api/SignUp',
            {email:user.email,first_name:user.first_name,last_name:user.last_name,age:user.age,location:user.location,gender:user.gender,password:user.password,interests1:user.interests1,interests2:user.interests2,interests3:user.interests3,prefferedSex1:user.prefferedSex1,prefferedSex2:user.prefferedSex2,prefferedSex3:user.prefferedSex3},
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

function deleteUser(email){
    axios.post('http://localhost:7071/api/DeleteUser',
            {email:email},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

function editUser(newUser,email){
    axios.post('http://localhost:7071/api/EditUser',
            {newemail:newUser.email,first_name:newUser.first_name,last_name:newUser.last_name,age:newUser.age,location:newUser.location,gender:newUser.gender,interests1:newUser.interests1,interests2:newUser.interests2,interests3:newUser.interests3,prefferedSex1:newUser.prefferedSex1,prefferedSex2:newUser.prefferedSex2,prefferedSex3:newUser.prefferedSex3,email:email},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

function loadUsers(email,minAge,maxAge){
    return axios.get('http://localhost:7071/api/LoadUsers',{
                params:{
                email:email,
                minAge:minAge,
                maxAge:maxAge
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

async function likeUser(email,user2_id,counter){
    return axios.post('http://localhost:7071/api/LikeUser',
            {email:email,user2_id:user2_id,counter:counter},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

async function checkForMatch(email,user2_id){
    return axios.get('http://localhost:7071/api/CheckForMatch',{
                params:{
                email:email,
                user2_id:user2_id
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

function insertMatch(match){
    axios.post('http://localhost:7071/api/InsertMatch',
            {like1:match.like1,like2:match.like2},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}
async function getMatch(email){
    return axios.get('http://localhost:7071/api/GetMatch',{
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

async function getEmailFromId(user){
    return axios.get('http://localhost:7071/api/GetEmailFromId',{
                params:{
                id:user.id
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

async function deleteMatch(userId,user2Id){
    return axios.post('http://localhost:7071/api/DeleteMatch',
            {userId:userId,user2Id:user2Id},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

async function getIdFromEmail(email){
    return axios.get('http://localhost:7071/api/GetIdFromEmail',{
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

async function adminAmountMatches(){
    return axios.get('http://localhost:7071/api/AmountMatches',{
        })
        .then(function(response){
            console.log("Success!")
            return response.data
            
        })
        .catch(function(error){
            console.log(error)
        })
}

async function adminAmountUsers(){
    return axios.get('http://localhost:7071/api/AmountUsers',{
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
    renderUserProfile,
    deleteUser,
    editUser,
    loadUsers,
    likeUser,
    checkForMatch,
    insertMatch,
    getMatch,
    getEmailFromId,
    deleteMatch,
    getIdFromEmail,
    adminAmountMatches,
    adminAmountUsers
}