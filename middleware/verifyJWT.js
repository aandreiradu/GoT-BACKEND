const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    console.log('start verifyJWT');
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')) {
        console.log('nu are bearer in header');
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1];
    console.log('token middleware',token);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            console.log('err',err);
            console.log('decoded',decoded);

            if(err) {
                console.log('error on verifying the access token => return 403');
                return res.status(403).json({message : 'Forbidden'});
            }
            
            next();
         }
    )
    console.log('end verifyJWT');
}

module.exports = verifyJWT;