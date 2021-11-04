const userService = require("../services/user.services")



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
  const user = req.body
   const userResult = await userService.register(user)
   res.status(201).json(userResult);
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, message: e.message });
  }
}


const login = async function (req, res, next) {
    try {
      const user = req.body
      console.log("user on controller ", user);
     const userResult = await userService.login(user)

     res.status(200).json(userResult); 
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: 400, message: e.message });
    }
 }


module.exports = {getUsers,register,login}