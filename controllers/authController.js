const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({message: "User not found"});
  }

  // eval password => decrpyt
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    console.log("password matched");

    // generate tokens;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log("result", result);

    // Create Secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization token to user;
    res.json({ token: accessToken });
  } else {
    return res.status(401).json({message: "Incorrect username of password"});
  }
};

module.exports = { handleLogin };
