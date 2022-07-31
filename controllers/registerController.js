const User = require("../model/Users");
const bcrypt = require("bcrypt");
const { validateEmail,validatePassword,validateUsername } = require('../utils/registerValidations');

const handleNewUser = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({
        message: "Username and password are required!",
        statusCode: 400,
      });
  }

  // validate req body.
  if(!validateEmail(email) || !validatePassword(password) || !validateUsername(username)) {
      return res.status(400).json({message : 'Invalid payload. User informations didnt passed the validations'});
  }

  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "This username is already taken", statusCode: 409 });
  }

  const emailTaken = await User.findOne({ email }).exec();
  if (emailTaken) {
    return res
      .status(409)
      .json({ message: "This email is already in use", statusCode: 409 });
  }

  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      username,
      password: hasedPassword,
      email,
    });

    return res
      .status(201)
      .json({ message: `user ${username} has been created`, status: 201 });
  } catch (error) {
    console.error("error");
    return res.status(500).json(error);
  }
};

module.exports = { handleNewUser };
