const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {})
}


// [SECTION] Token Verification

module.exports.verify = (req, res, next) => {
    
    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({auth: "Failed. No Token"});
    }else{
        
        token = token.slice(7, token.length)


        // [Section] Token decryption
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedToken){

            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            }else{
                req.user = decodedToken;
                next();
            }
        })
    }
}

// [SECTION] Error handler
module.exports.errorHandler = (err, req, res, next) =>{
    
    console.error(err);
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details || null
        }
    })
}