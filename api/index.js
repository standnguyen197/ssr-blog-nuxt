const express = require('express')
const User = require('../server/models/auth')
const mPost = require('../server/models/mpost')
const bcrypt = require('bcrypt')
var shortid = require('shortid')
var moment = require('moment')

var slug = require('slug')
const saltRounds = 10
// Regex
const regex = new RegExp(/[!#$%^&*<>/\\'"(){}]+/g)

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})


// Add POST - /api/login
router.post('/login', (req, res) => {

// Form POST INPUT
const stringEmail = req.body.email 
const stringPassword = req.body.password

// Index Form
const email = stringEmail.replace(regex, '')
const password = stringPassword.replace(regex, '')
  if(email.length == 0 || password.length == 0){

    res.json({
      imes: 'Please enter full!' , 
      dataCode: 0 ,
      statusLogin : ''});

  }else{

    User.findOne({email: email}, ( err , person ) => {
     
      if(err){
        res.json({ 
        imes: 'Login not success!' ,
        dataCode:0 , 
        statusLogin : '' 
      })
      }else{
        const hashPass = person.password
        bcrypt.compare(password, hashPass, function(err, resCode) {
          
            //Check password
            if(resCode === true){
              const userData = {
                username: person.username,
                email: person.email
              }
              req.session.authUser = { userData }
              res.json({ 
                userData ,
                statusLogin : '200' 
              });
             
            }else{
              res.json({ 
                imes: 'Message: Login not success! ' , 
                dataCode:0 , 
                statusLogin : ''
              });
            }
       });
        
      }
      
    })

  }
})

// Add POST - /api/register
router.post('/register', (req, res) => {
// Form POST INPUT
const stringEmail = req.body.email 
const stringPassword = req.body.password
const stringSecretCode = req.body.secretcode
// Index Form
const email = stringEmail.replace(regex, '')
const password = stringPassword.replace(regex, '')
const secretcode = stringSecretCode.replace(regex, '')
const username = email.split('@')[0]
  if(email.length == 0 || password.length == 0 || secretcode.length == 0){

    res.json({imes: 'Please enter full!' , dataCode: 0});

  }else{

    if(secretcode == 'kingstand'){
              // Check username && email
              User.count( {email: email } , function(err, countUser) {
                if(countUser == 0){
                    // Add user 
                            bcrypt.hash(password, saltRounds, function(err, hash) {
                                console.log(hash);
                                var newUser = new User();
                                newUser.email    = email;
                                newUser.password = hash;
                                newUser.username = username;
                            // save the user
                                newUser.save(function(err) {
                                if (err)
                                    throw err;
                                res.json({imes: 'Register success!' , dataCode: 1});
                               
                            });
                 });
                    
                }else{
                        res.json( {imes:'Account already exists!' , dataCode: 0});
                    }   
                    
            });
    }else{
        res.json( {imes:'SecretCode not work!' , dataCode: 0});
    }

     // else tổng
    }

})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})


// ======================== CREATE POST ============================ //

router.post('/createPost', (req, res) => {
  var newPost = new mPost();
  newPost._id    = shortid.generate();
  newPost.title    = req.body.title;
  newPost.description = req.body.description;
  newPost.keyword = req.body.keyword;
  newPost.cover = req.body.cover;
  newPost.date = moment().format();
  newPost.category = req.body.category;
  newPost.content = req.body.content;
  newPost.slug = slug(req.body.title);
// save the user
  newPost.save(function(err) {
  if (err){
    throw err;
    res.json({imes: 'Đăng bài thất bại!'});
  }else{
    res.json({imes: 'Đăng bài thành công!'});
  } 
});
  

})

// ======================== LIST POST ============================ //

router.get('/listPost', (req, res) => {

  mPost.find({}, 'title description keyword cover content category slug' , (err, posts) => {
    if (err) {
      return handleError(err);
    }else{
      res.json({
        posts
      })
    }
  });

})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}