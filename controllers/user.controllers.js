const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// importing user context
const User = require("../models/user");

var UserService = require('../services/user.services')    

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.register = async function (req, res, next) {
    console.log("INSIDE USER CONTROLLER")
   // Our register logic starts here
   try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

  // Create user in our database
  const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      token:"",
    });

    // Create token
    const tokenSigned = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
 
    await User.updateOne({
      email: email
  }, { token: tokenSigned }, { upsert: true });
      
    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}


exports.login = async function (req, res, next) {
    console.log("INSIDE USER CONTROLLER")
    // Our login logic starts here
    console.log(1);
    try {
      // Get user input
      const { email, password } = req.body;
      console.log(2);
      // Validate user input
      if (!(email && password)) {
        console.log(3);
        res.status(400).send("All input is required");
      }
      console.log(4);
      // Validate if user exist in our database
      const user = await User.findOne({ email });
      console.log(5);
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        console.log(6);
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      } else {
        console.log(7);
        res.status(400).send("Invalid Credentials");
      }
    
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
 }