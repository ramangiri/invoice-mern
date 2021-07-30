const jsonwebtoken = require('jsonwebtoken');
const key = process.env.SESSION_JWT_KEY;

const authCheck = (req, res,next)=>{
    if(req.headers['authorization']){
    token1=(req.headers['authorization']).slice(7)
        if(token1){
            jsonwebtoken.verify( token1,key,async function(error,decoded){
                if(error){
                    return res.status(200).json({message:"Incorrect token"})
                }
                next();                
              });
       }
    }    
   else{
       res.json({ message : "Authentication token missing"})
   }
};

module.exports = authCheck