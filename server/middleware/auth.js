const jwt = require('jsonwebtoken');

const secretKey = '1234'

let authenticateJwt=(req,res,next)=>{
    let key=req.headers.authorization;
    // console.log(key);
    if(key){
      let token=key.split(' ')[1];
      jwt.verify(token,secretKey,(err,admin)=>{
        if(err) throw err;
        req.admin=admin;
        next();
      })
    }else{
      res.status(404).json({error:'not allowed!!'});
    }
  }
  module.exports={
    secretKey,
    authenticateJwt, 
  }