const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  const user = {
    email,
    password: passwordHash.generate(password)
  };
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "The user already exists"
      });
    }
  }
  catch (error) {
    return res.status(500).json({ error });
  }
  try {
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Success",
      token: userObject.getToken()
    });
  }
  catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  try {
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(401).json({
        text: "The user does not exist"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Incorrect password"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Successful authentication"
    });
  }
  catch (error) {
    return res.status(500).json({
      error
    });
  }
}

exports.login = login;
exports.signup = signup;