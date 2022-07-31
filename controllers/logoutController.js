const User = require('../model/Users');

const handleLogOut = async (req,res) => {
    const cookies = req.cookies;

    if(!cookies.jwt) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    // get  the use with this refresh token
    try {
        const findUser = await User.findOne({refreshToken}).exec();
        console.log('findUser logout',findUser);
    
        if(!findUser) {
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              });
    
            return res.sendStatus(204);
        };
    
        findUser.refreshToken = "";
        await findUser.save();
        
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({statusCode : 204, message: 'Logout completed'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : error.message});
    }
}

module.exports = {handleLogOut};