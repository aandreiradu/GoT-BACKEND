const User = require("../model/Users");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  console.log('START REFRESH TOKEN');
  // check if we have cookies set
  const cookies = req.cookies;

  console.log("cookies", cookies);

  if (!cookies?.jwt) {

    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  // find the user which has the refresh token attached
  const findUser = await User.findOne({ refreshToken });

  console.log("findUser result", findUser);
  if (!findUser) {
    return res.sendStatus(403);
  }

  // start checking the jwt;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || findUser.username !== decode.username) {
      console.log('VERIFY REFRESH TOKEN');
      return res.sendStatus(403);
    }

    const newAccessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          email: findUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    console.log("newAccessToken generated", newAccessToken);

    return res.json({ accessToken: newAccessToken });
  });

  console.log('STOP REFRESH TOKEN');
};

module.exports = { handleRefreshToken };
