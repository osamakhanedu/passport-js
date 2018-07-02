
const LocalStrategy = require('passport-local').Strategy;
const User  =  require('../models').user; 
const bcrypt = require('bcrypt');

/*  Login handler for passport js*/
const  strategy = new LocalStrategy(
    function (username, password, done) {

      console.log("in Strategy");
      
        User.findOne({
          where:{ 
             username :username 
          }
      }).then(result=>{  
        
           if(result === null){ 
             // user does not exit
             return done(null, false);
           }
           else{ 
             // check password
            let hash = result.dataValues.password;
             
            if(checkpassword(password,hash)){ 
               // in password matches

               // destructring ...
               const {userid,username,firstname,lastname,roleid,userstatusid} = result.dataValues;
               
               return done(null, {
                 id : userid,
                 username,
                 firstname,
                 lastname,
                 roleid,
                 userstatusid
               })
            }else{ 
              // password don't matches
              return done(null, false, { message: 'Incorrect password' })
            }
            

            }
      })
      .catch(error=>{
        console.log('user',error); 
        return done(error);
          
      })
        
      
       

    function checkpassword(inputPassword,hash) {
      return bcrypt.compareSync(inputPassword, hash);
    }
  
    }
  );
  
  

  module.exports = strategy  