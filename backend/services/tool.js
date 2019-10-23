var UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

//create admin
var createadmin = ()=>{
    bcrypt.hash("admin", saltRounds).then(function(hash) {
        UserModel.create({
            name : 'rupali',
            password : hash,
            emailid : 'periwal.rupali@gmail.com',
            contact : '9563152391',
            type: 'ADMIN',
        }).then(()=>{
            console.log('Admin account created')
        }).catch((error)=>{
            console.error(error)
        })
    });
}


//check if admin
var checkadmin = (user)=>{
    
}


 var hashPassword = (password)=>{
    return (new Promise((resolve,reject)=>{
        bcrypt.hash(password, saltRounds).then(function(hash) {
            resolve(hash);
        }).catch((err)=>{
            reject(err);
        })
    }))
}

module.exports={ createadmin, hashPassword }