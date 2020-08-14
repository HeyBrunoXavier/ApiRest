const jwt = require('jsonwebtoken');
function Auth(req,res,next){
    
    const authToken = req.headers['authorization'];
    if(authToken != undefined){

        const bearer = authToken.split(' ');
        let token = bearer[1];
        const JWTsecret = "X-Wing";
        jwt.verify(token,JWTsecret,(err, data) =>{
            if(err){
                res.status(401);
                res.send("Invalid Token");
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                req.empresa = "SRNSolutions";
                next();
            }
        });

    }else{
        res.status(401);
        res.send("Invalid Token")
    }
}

module.exports = Auth;