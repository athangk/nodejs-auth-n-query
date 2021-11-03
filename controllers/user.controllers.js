var userService = require('../services/user.services')    

const getUsers = async function (req, res, next) {
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await userService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

const register = async function (req, res, next) {
   try {
   const user = await userService.register(req,res,next)
   res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, message: e.message });
  }
}


const login = async function (req, res, next) {
    try {
     const user = await userService.login(req,res,next)
     res.status(200).json(user); 
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: 400, message: e.message });
    }
 }


module.exports = {getUsers,register,login}