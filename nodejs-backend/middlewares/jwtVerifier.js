const {jwtmock} = require('../config/config')

module.exports.verifyJWT = function(req, res, next){
    if(req.headers['x-access-token']==jwtmock)
    return next();
    else
    return res.status(403).json({msg: 'NOT AUTHORIZED'})
}